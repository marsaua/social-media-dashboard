import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
