import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { Posts } from "./post.entity";
import { CommentsService } from "../comments/comments.service";
import { Comments } from "../comments/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Comments])],
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
  exports: [PostsService],
})
export class PostsModule {}
