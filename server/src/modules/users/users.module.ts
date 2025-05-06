import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "src/modules/users/users.controller";
import { UsersService } from "./providers/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/user.entity";
import { AuthModule } from "src/modules/auth/auth.module";
import { PostsModule } from "src/modules/posts/posts.module";
import { UploadsModule } from "src/modules/uploads/uploads.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => PostsModule),
    UploadsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
