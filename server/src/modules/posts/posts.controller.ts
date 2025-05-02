import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PostsService } from "src/modules/posts/providers/posts.service";
import { CreatePostDto } from "src/modules/posts/dto/create-post.dto";
import { ActiveUser } from "src/modules/auth/decorators/active-user.decorator";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { UpdatePostDto } from "src/modules/posts/dto/update-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
    @ActiveUser("username") username: ActiveUserData["username"],
  ) {
    return this.postsService.createPost(createPostDto, uploadedFile, username);
  }

  @Get()
  public findPosts() {
    return this.postsService.findPosts();
  }

  @Get(":id")
  public findPost(@Param("id") postId: number) {
    return this.postsService.findPost(postId);
  }

  @Patch(":id")
  public updatePost(@Param("id") postId: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  @Delete(":id")
  public deletePost(@Param("id") postId: number) {
    return this.postsService.deletePost(postId);
  }
}
