import { Comment } from "src/modules/comments/comment.entity";

export class CommentResponseDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  postId: number;

  static fromEntity(entity: Comment): CommentResponseDto {
    return {
      id: entity.id,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      authorId: entity.author?.id,
      postId: entity.post?.id,
    };
  }
}
