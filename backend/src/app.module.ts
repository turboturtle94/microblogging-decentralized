// src/app.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./data-source"; // 👈 Import config
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { LikesModule } from "./likes/likes.module";
import ENTITIES from "./entities";

@Module({
  imports: [
    // Use the same options from AppDataSource
    TypeOrmModule.forRoot(AppDataSource.options), // 👈 Use shared config
    TypeOrmModule.forFeature(ENTITIES), // 👈 Feature modules
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
  ],
})
export class AppModule {}
