// src/posts/post.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Users } from "../users/user.entity";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_address: string;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({
    name: "wallet_address",
    referencedColumnName: "wallet_address",
  })
  user: Users;
}
