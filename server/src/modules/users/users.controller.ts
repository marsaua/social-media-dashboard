import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { Request } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("current")
  public getCurrent(@Req() request: Request) {
    return this.usersService.getCurrent(request);
  }

  @Get(":id")
  public findOne(@Param("id") userId: number) {
    return this.usersService.findOne(userId);
  }

  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Post()
  public createOne(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }
}
