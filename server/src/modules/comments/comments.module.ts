import { forwardRef, Module } from "@nestjs/common";
import { CommentsController } from "src/modules/comments/comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "src/modules/comments/providers/comments.service";
import { Comment } from "src/modules/comments/comment.entity";
import { PostsModule } from "src/modules/posts/posts.module";
import { UsersModule } from "src/modules/users/users.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [forwardRef(() => UsersModule), forwardRef(() => PostsModule), TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
})
export class CommentsModule {}
