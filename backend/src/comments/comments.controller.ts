import { Controller, Post, Body } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comments } from "./comment.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags("Comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * Create a new comment on a post.
   *
   * @param createCommentDto - Data Transfer Object containing post ID, wallet address, and content.
   * @returns The newly created comment entity.
   */
  @Post()
  @ApiOperation({ summary: "Create a new comment on a post" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: "Comment created successfully",
    type: Comments,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comments> {
    return this.commentsService.create(createCommentDto);
  }
}
