import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Users } from "./users/user.entity";
import { Posts } from "./posts/post.entity";
import { Comments } from "./comments/comment.entity";
import { Likes } from "./likes/like.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Microblogger@123",
      database: "microblogger",
      entities: [Users, Posts, Comments, Likes],
      synchronize: true, // use only in dev!
    }),
    TypeOrmModule.forFeature([Users, Posts, Comments, Likes]),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
  ],
})
export class AppModule {}
