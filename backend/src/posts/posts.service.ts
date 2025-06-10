// src/posts/posts.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>
  ) {}

  async findAll() {
    return this.postsRepository.find({
      relations: ["user"], // Join user table
      order: { timestamp: "DESC" }, // Optional: latest posts first
    });
  }

  async create(createPostDto: CreatePostDto) {
    const savedPost = await this.postsRepository.save(createPostDto);
    return this.postsRepository.findOne({
      where: { id: savedPost.id },
      relations: ["user"],
    });
  }

  async findOne(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      relations: ["user", "comments", "comments.user"],
    });
  }

  update(id: number, updatePostDto: any) {
    return this.postsRepository.update(id, updatePostDto);
  }
}
