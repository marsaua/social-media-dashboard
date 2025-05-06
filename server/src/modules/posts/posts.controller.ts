import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "src/modules/posts/providers/posts.service";
import { CreatePostDto } from "src/modules/posts/dto/create-post.dto";
import { ActiveUser } from "src/modules/auth/decorators/active-user.decorator";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { UpdatePostDto } from "src/modules/posts/dto/update-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCommentDto } from "src/modules/comments/dto/create-comment.dto";
import { PublicEndpoint } from "src/modules/auth/decorators/public-endpoint.decorator";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
    @ActiveUser("username") username: ActiveUserData["username"],
  ) {
    return this.postsService.createPost(createPostDto, uploadedFile, username);
  }

  @PublicEndpoint()
  @Get()
  public findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(":postId/comments")
  public findCommentsOnPost(@Param("postId") postId: number) {
    return this.postsService.findCommentsOnPost(postId);
  }

  @Post(":postId/comments")
  public createCommentOnPost(
    @Param("postId") postId: number,
    @ActiveUser("sub") userId: ActiveUserData["sub"],
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.createCommentOnPost(postId, userId, createCommentDto);
  }

  @Patch(":postId/comments/:commentId")
  public updateCommentOnPost(@Param("commentId") commentId: number, @Body() updateCommentDto: CreateCommentDto) {
    return this.postsService.updateCommentOnPost(commentId, updateCommentDto);
  }

  @Delete(":postId/comments/:commentId")
  @HttpCode(204)
  public deleteCommentOnPost(@Param("commentId") commentId: number) {
    return this.postsService.deleteCommentOnPost(commentId);
  }

  @Get(":postId")
  public findPost(@Param("postId") postId: number) {
    return this.postsService.findPost(postId);
  }

  @Patch(":postId")
  public updatePost(@Param("postId") postId: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  @Delete(":postId")
  @HttpCode(204)
  public deletePost(@Param("postId") postId: number) {
    return this.postsService.deletePost(postId);
  }
}
