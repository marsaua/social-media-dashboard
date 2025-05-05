import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Post } from "src/modules/posts/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "src/modules/posts/dto/create-post.dto";
import { UsersService } from "src/modules/users/providers/users.service";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { UpdatePostDto } from "src/modules/posts/dto/update-post.dto";
import {
  CloudinaryFolder,
  UploadToCloudinaryProvider,
} from "src/modules/uploads/providers/upload-to-cloudinary.provider";
import { CreateCommentDto } from "src/modules/comments/dto/create-comment.dto";
import { CommentsService } from "src/modules/comments/providers/comments.service";
import { UpdateCommentDto } from "src/modules/comments/dto/update-comment.dto";
import { PostResponseDto } from "src/modules/posts/dto/post-response.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly uploadToCloudinaryProvider: UploadToCloudinaryProvider,
    @Inject(forwardRef(() => CommentsService))
    private readonly commentsService: CommentsService,
  ) {}

  public async createPost(
    createPostDto: CreatePostDto,
    uploadedFile: Express.Multer.File,
    username: ActiveUserData["username"],
  ) {
    const user = await this.usersService.findUserByUsername(username);

    let imageUrl: string | undefined = undefined;
    if (uploadedFile) {
      imageUrl = await this.uploadToCloudinaryProvider.upload(uploadedFile, CloudinaryFolder.POST_IMAGES);
    }

    const post = this.postsRepository.create({ ...createPostDto, author: user, imageUrl });

    return await this.postsRepository.save(PostResponseDto.fromEntity(post));
  }

  public async findAllPosts() {
    const posts = await this.postsRepository.find({
      relations: ["author", "comments"],
    });

    return posts.map((post) => PostResponseDto.fromEntity(post));
  }

  public async findAllPostsFromUser(userId: ActiveUserData["sub"]) {
    const user = await this.usersService.findUser(userId);

    if (!user) {
      throw new NotFoundException("User with this id does not exist.");
    }

    const posts = await this.postsRepository.find({
      where: {
        author: { id: userId },
      },
      relations: ["author", "comments"],
    });

    return posts.map((post) => PostResponseDto.fromEntity(post));
  }

  public async findPost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ["author", "comments"],
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    return PostResponseDto.fromEntity(post);
  }

  public async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ["author", "comments"],
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    const editedPost: Post = { ...post, ...updatePostDto, id: 13 };

    await this.postsRepository.save(editedPost);

    return PostResponseDto.fromEntity(editedPost);
  }

  public async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    await this.postsRepository.remove(post);
  }

  // Comments
  public async findCommentsOnPost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    return this.commentsService.findCommentsOnPost(postId);
  }

  public async createCommentOnPost(postId: number, userId: number, createCommentDto: CreateCommentDto) {
    return this.commentsService.createCommentOnPost(postId, userId, createCommentDto);
  }

  public async updateCommentOnPost(commentId: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateCommentOnPost(commentId, updateCommentDto);
  }

  public async deleteCommentOnPost(commentId: number) {
    return this.commentsService.deleteCommentOnPost(commentId);
  }
}
