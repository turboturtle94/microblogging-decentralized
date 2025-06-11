import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Users } from "../users/user.entity";
import { Comments } from "../comments/comment.entity";

/**
 * Represents a post created by a user.
 * Each post contains text content, a reference to the author via wallet address,
 * and is timestamped at creation.
 *
 * This entity maps to the 'posts' table in the database.
 */
@Entity()
export class Posts {
  /**
   * Auto-generated unique identifier for the post.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The wallet address of the user who created the post.
   * Used to associate the post with a user.
   */
  @Column()
  wallet_address: string;

  /**
   * The content of the post.
   */
  @Column()
  content: string;

  /**
   * The timestamp when the post was created.
   * Automatically set by the database.
   */
  @CreateDateColumn()
  timestamp: Date;

  /**
   * Many-to-one relationship linking the post to the user who created it.
   * Joined using the wallet address.
   */
  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({
    name: "wallet_address",
    referencedColumnName: "wallet_address",
  })
  user: Users;

  /**
   * One-to-many relationship linking the post to its comments.
   * Cascade enabled so comments are persisted/removed along with the post.
   */
  @OneToMany(() => Comments, (comment) => comment.post, { cascade: true })
  comments: Comments[];
}
