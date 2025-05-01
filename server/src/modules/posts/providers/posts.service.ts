import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Post } from "src/modules/posts/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "src/modules/posts/dto/create-post.dto";
import { UsersService } from "src/modules/users/providers/users.service";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { UpdatePostDto } from "src/modules/posts/dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  public async findPosts() {
    return await this.postsRepository.find();
  }

  public async findUserPosts(userId: ActiveUserData["sub"]) {
    const user = await this.usersService.findUser(userId);

    if (!user) {
      throw new NotFoundException("User with this id does not exist.");
    }

    return await this.postsRepository.find({
      where: {
        author: { id: userId },
      },
    });
  }

  public async findPost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    return post;
  }

  public async createPost(createPostDto: CreatePostDto, username: ActiveUserData["username"]) {
    const user = await this.usersService.findUserByUsername(username);

    const post = this.postsRepository.create({ ...createPostDto, author: user });

    return await this.postsRepository.save(post);
  }

  public async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    const editedPost = { ...post, ...updatePostDto };

    return await this.postsRepository.save(editedPost);
  }

  public async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException("Post with this id does not exist.");
    }

    return await this.postsRepository.remove(post);
  }
}
