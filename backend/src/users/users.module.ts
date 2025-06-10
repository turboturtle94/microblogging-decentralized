import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { Users } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // <-- Important line!
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // optional, only if needed elsewhere
})
export class UsersModule {}
