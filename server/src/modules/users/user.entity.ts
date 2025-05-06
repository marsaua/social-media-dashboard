import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Post } from "src/modules/posts/post.entity";
import { Comment } from "src/modules/comments/comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
    default: null,
  })
  avatarUrl: string | null;

  @Column({
    type: "varchar",
    length: 512,
    nullable: true,
  })
  @Exclude()
  refreshToken?: string | null;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
