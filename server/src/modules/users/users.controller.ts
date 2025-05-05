import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { ActiveUser } from "src/modules/auth/decorators/active-user.decorator";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { PostsService } from "src/modules/posts/providers/posts.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Get("current")
  public getCurrentUser(@ActiveUser("sub") userId: ActiveUserData["sub"]) {
    return this.usersService.getCurrentUser(userId);
  }

  @Get(":userId/posts")
  public findUserPosts(@Param("userId") userId: number) {
    return this.postsService.findAllPostsFromUser(userId);
  }

  @Get(":userId")
  public findUser(@Param("userId") userId: number) {
    return this.usersService.findUser(userId);
  }

  @Patch(":userId")
  @UseInterceptors(FileInterceptor("avatar"))
  public updateUser(
    @Param("userId") userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
  ) {
    return this.usersService.updateUser(userId, updateUserDto, uploadedFile);
  }

  @Get()
  public findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
