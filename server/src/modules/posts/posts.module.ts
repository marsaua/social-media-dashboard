import { forwardRef, Module } from "@nestjs/common";
import { PostsController } from "src/modules/posts/posts.controller";
import { PostsService } from "src/modules/posts/providers/posts.service";
import { UsersModule } from "src/modules/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/modules/posts/post.entity";
import { UploadsModule } from "src/modules/uploads/uploads.module";
import { CommentsModule } from "src/modules/comments/comments.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    forwardRef(() => CommentsModule),
    forwardRef(() => UsersModule),
    UploadsModule,
    TypeOrmModule.forFeature([Post]),
  ],
  exports: [PostsService],
})
export class PostsModule {}
