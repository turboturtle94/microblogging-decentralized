import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("verify")
  verify(
    @Body() body: { message: string; signature: string; address: string }
  ) {
    return this.authService.verify(body.message, body.signature);
  }
}
