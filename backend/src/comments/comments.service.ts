// src/comments/comments.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comments } from "./comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>
  ) {}
  /**
   * Creates and saves a new comment associated with a post.
   *
   * @param {CreateCommentDto} createCommentDto - The Data Transfer Object containing the data required to create a new comment.
   * @returns {Promise<Comments>} A promise that resolves to the newly created and saved comment entity.
   */
  async create(createCommentDto: CreateCommentDto): Promise<Comments> {
    const newComment = this.commentsRepository.create(createCommentDto);
    return this.commentsRepository.save(newComment);
  }
}
