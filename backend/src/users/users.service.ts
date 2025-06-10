// src/users/users.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async createOrUpdate(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto); // Will upsert
  }

  async findOne(wallet: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { wallet_address: wallet },
    });

    if (!user) {
      throw new NotFoundException(`User with wallet ${wallet} not found`);
    }

    return user;
  }
}
