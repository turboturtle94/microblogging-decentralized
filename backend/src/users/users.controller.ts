import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":wallet")
  @ApiOperation({ summary: "Retrieve user profile by wallet address" })
  @ApiParam({ name: "wallet", type: String })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("wallet") wallet: string) {
    return this.usersService.findOne(wallet);
  }

  @Post()
  @ApiOperation({ summary: "Create or update a user profile" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "User profile created or updated successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  createOrUpdate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOrUpdate(createUserDto);
  }
}
