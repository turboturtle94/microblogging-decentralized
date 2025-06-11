import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreateCommentDto } from "../comments/dto/create-comment.dto";
import { CommentsService } from "../comments/comments.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new post" })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    description: "Post created successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all posts" })
  @ApiResponse({
    status: 200,
    description: "List of posts with user info",
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a post by ID including comments" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Post found with user and comments",
  })
  @ApiResponse({ status: 404, description: "Post not found" })
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a post by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({ status: 200, description: "Post updated successfully" })
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Post(":id/comment")
  @ApiOperation({ summary: "Add a comment to a post" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: "Comment added to the post",
  })
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
