import { Module } from "@nestjs/common";
import { UsersController } from "src/modules/users/users.controller";
import { UsersService } from "./providers/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
