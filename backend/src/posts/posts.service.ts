// src/posts/posts.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";

/**
 * Service responsible for handling post-related operations such as
 * creation, retrieval, and updates.
 */
@Injectable()
export class PostsService {
  /**
   * Injects the Posts repository to enable database operations.
   *
   * @param postsRepository - The TypeORM repository for the Posts entity.
   */
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>
  ) {}

  /**
   * Retrieves all posts from the database, ordered by timestamp (latest first).
   * Also includes associated user information for each post.
   *
   * @returns {Promise<Posts[]>} A promise that resolves to an array of Posts with user data.
   */
  async findAll(): Promise<Posts[]> {
    return this.postsRepository.find({
      relations: ["user"],
      order: { timestamp: "DESC" },
    });
  }

  /**
   * Creates a new post entry in the database.
   *
   * @param {CreatePostDto} createPostDto - The DTO containing data for the new post.
   * @returns {Promise<Posts | null>} A promise that resolves to the saved post with user relation included.
   */
  async create(createPostDto: CreatePostDto): Promise<Posts | null> {
    const savedPost = await this.postsRepository.save(createPostDto);
    return this.postsRepository.findOne({
      where: { id: savedPost.id },
      relations: ["user"],
    });
  }

  /**
   * Retrieves a single post by its ID, including user and comment details.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @returns {Promise<Posts | null>} A promise that resolves to the post entity with related user and comments.
   */
  async findOne(id: number): Promise<Posts | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ["user", "comments", "comments.user"],
    });
  }

  /**
   * Updates an existing post's details in the database.
   *
   * @param {number} id - The ID of the post to update.
   * @param {any} updatePostDto - An object containing updated fields for the post.
   * @returns {Promise<any>} A promise that resolves when the update operation is complete.
   */
  update(id: number, updatePostDto: any): Promise<any> {
    return this.postsRepository.update(id, updatePostDto);
  }
}
