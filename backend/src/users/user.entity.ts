// src/users/user.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Posts } from "../posts/post.entity";
import { Comments } from "../comments/comment.entity";

@Entity()
export class Users {
  @PrimaryColumn()
  wallet_address: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profile_pic_url: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}
