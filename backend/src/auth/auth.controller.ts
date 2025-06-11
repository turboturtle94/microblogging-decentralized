import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("verify")
  @ApiOperation({ summary: "Verify signature and issue JWT" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Login to MyApp at 2025-06-09T10:00:00Z",
        },
        signature: { type: "string", example: "0xabc123..." },
        address: { type: "string", example: "0x1234567890abcdef" },
      },
      required: ["message", "signature", "address"],
    },
  })
  @ApiResponse({ status: 201, description: "Signature verified successfully." })
  @ApiResponse({ status: 400, description: "Invalid signature or payload." })
  verify(
    @Body() body: { message: string; signature: string; address: string }
  ) {
    return this.authService.verify(body.message, body.signature);
  }
}
