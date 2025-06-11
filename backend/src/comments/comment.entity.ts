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

/**
 * Represents a comment made by a user on a post.
 * Each comment is linked to a specific post and user via foreign keys.
 *
 * This entity maps to the 'comments' table in the database.
 */
@Entity()
export class Comments {
  /**
   * Auto-generated unique identifier for the comment.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Foreign key referencing the ID of the post this comment belongs to.
   */
  @Column()
  post_id: number;

  /**
   * The wallet address of the user who created the comment.
   * Used to associate the comment with a user.
   */
  @Column()
  wallet_address: string;

  /**
   * The textual content of the comment.
   */
  @Column()
  content: string;

  /**
   * The timestamp when the comment was created.
   */
  @CreateDateColumn()
  timestamp: Date;

  /**
   * Many-to-one relationship linking the comment to the post it belongs to.
   */
  @ManyToOne(() => Posts)
  @JoinColumn({ name: "post_id" })
  post: Posts;

  /**
   * Many-to-one relationship linking the comment to the user who wrote it.
   * Eager loading enabled to always fetch user data with the comment.
   */
  @ManyToOne(() => Users, (user) => user.comments, { eager: true })
  @JoinColumn({
    name: "wallet_address",
    referencedColumnName: "wallet_address",
  })
  user: Users;
}
