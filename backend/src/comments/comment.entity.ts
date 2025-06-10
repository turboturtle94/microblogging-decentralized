// src/comments/comments.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Posts } from "../posts/post.entity";
import { Users } from "../users/user.entity";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @Column()
  wallet_address: string;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Posts)
  @JoinColumn({ name: "post_id" })
  post: Posts;

  @ManyToOne(() => Users, (user) => user.comments, { eager: true })
  @JoinColumn({
    name: "wallet_address",
    referencedColumnName: "wallet_address",
  })
  user: Users;
}
