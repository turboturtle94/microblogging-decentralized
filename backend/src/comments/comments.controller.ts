// src/comments/comments.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comments } from "./comment.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comments> {
    return this.commentsService.create(createCommentDto);
  }
}
