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

  /**
   * Creates a new user or updates an existing user based on wallet address.
   * TypeORM's `save` method performs an UPSERT (insert or update).
   *
   * @param createUserDto - Data Transfer Object containing user profile information.
   * @returns A promise resolving to the created or updated user entity.
   */
  async createOrUpdate(createUserDto: CreateUserDto): Promise<Users> {
    return this.usersRepository.save(createUserDto);
  }

  /**
   * Finds a user by their wallet address.
   *
   * @param wallet - The wallet address of the user.
   * @returns A promise resolving to the user entity if found.
   * @throws NotFoundException if no user is found with the provided wallet address.
   */
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
