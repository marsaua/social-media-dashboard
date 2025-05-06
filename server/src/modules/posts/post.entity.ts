import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "src/modules/users/user.entity";
import { Comment } from "src/modules/comments/comment.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  description: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
