import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { ActiveUser } from "src/modules/auth/decorators/active-user.decorator";
import { ActiveUserData } from "src/modules/auth/interfaces/active-user-data.interface";
import { PostsService } from "src/modules/posts/providers/posts.service";

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

  @Get(":id/posts")
  public findUserPosts(@Param("id") userId: number) {
    return this.postsService.findUserPosts(userId);
  }

  @Get(":id")
  public findUser(@Param("id") userId: number) {
    return this.usersService.findUser(userId);
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
