// src/posts/posts.controller.ts
import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreateCommentDto } from "../comments/dto/create-comment.dto";
import { CommentsService } from "../comments/comments.service";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Post(":id/comment")
  async addComment(
    @Param("id") postId: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentsService.create({
      ...createCommentDto,
      post_id: Number(postId),
    });
  }
}
