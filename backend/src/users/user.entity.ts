import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Posts } from "../posts/post.entity";
import { Comments } from "../comments/comment.entity";

/**
 * Represents a user in the decentralized social media application.
 * Each user is uniquely identified by their wallet address.
 *
 * This entity maps to the 'users' table in the database and maintains
 * relationships with posts and comments made by the user.
 */
@Entity()
export class Users {
  /**
   * The unique wallet address of the user.
   * Serves as the primary key.
   */
  @PrimaryColumn()
  wallet_address: string;

  /**
   * The display name or handle chosen by the user.
   */
  @Column()
  username: string;

  /**
   * A short biography or description provided by the user.
   * This field is optional.
   */
  @Column({ nullable: true })
  bio: string;

  /**
   * URL to the user's profile picture.
   * This field is optional.
   */
  @Column({ nullable: true })
  profile_pic_url: string;

  /**
   * One-to-many relationship with the posts created by the user.
   */
  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  /**
   * One-to-many relationship with the comments created by the user.
   */
  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}
