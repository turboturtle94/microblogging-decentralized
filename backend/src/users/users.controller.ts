import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":wallet") // <- REST-style route param
  findOne(@Param("wallet") wallet: string) {
    return this.usersService.findOne(wallet);
  }

  @Post()
  createOrUpdate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOrUpdate(createUserDto);
  }
}
