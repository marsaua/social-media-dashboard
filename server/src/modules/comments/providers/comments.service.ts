import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDto } from "src/modules/comments/dto/create-comment.dto";
import { PostsService } from "src/modules/posts/providers/posts.service";
import { Comment } from "src/modules/comments/comment.entity";
import { UsersService } from "src/modules/users/providers/users.service";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { UpdateCommentDto } from "src/modules/comments/dto/update-comment.dto";
import { CommentResponseDto } from "src/modules/comments/dto/comment-response.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  public async createCommentOnPost(
    postId: number,
    userId: ActiveUserData["sub"],
    createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const post = await this.postsService.findPost(postId);

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    const user = await this.usersService.findUser(userId);

    if (!user) {
      throw new NotFoundException("User with this id does not exist.");
    }

    const createdComment = await this.commentsRepository.save({
      content: createCommentDto.content,
      author: user,
      post,
    });

    return CommentResponseDto.fromEntity(createdComment);
  }

  public async findCommentsOnPost(postId: number) {
    const comments = await this.commentsRepository.find({
      relations: ["author", "post"],
      where: {
        post: {
          id: postId,
        },
      },
    });

    return comments.map((comment) => CommentResponseDto.fromEntity(comment));
  }

  public async updateCommentOnPost(commentId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOne({
      relations: ["author", "post"],
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment with this id does not exist.");
    }

    const updatedComment = this.commentsRepository.create({
      ...comment,
      ...updateCommentDto,
    });

    const savedComment = await this.commentsRepository.save(updatedComment);

    return CommentResponseDto.fromEntity(savedComment);
  }

  public async deleteCommentOnPost(commentId: number) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment with this id does not exist.");
    }

    await this.commentsRepository.remove(comment);
  }
}
