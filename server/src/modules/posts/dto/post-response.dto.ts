import { Post } from "src/modules/posts/post.entity";

export class PostResponseDto {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  totalComments: number;

  static fromEntity(entity: Post): PostResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      authorId: entity.author?.id,
      totalComments: entity.comments?.length || 0,
    };
  }
}
