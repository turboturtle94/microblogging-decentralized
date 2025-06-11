// src/database/entities.ts
import { Users } from "./users/user.entity";
import { Posts } from "./posts/post.entity";
import { Comments } from "./comments/comment.entity";
import { Likes } from "./likes/like.entity";

const ENTITIES = [Users, Posts, Comments, Likes];

export default ENTITIES;
