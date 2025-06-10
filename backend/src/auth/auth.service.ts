import { Injectable } from "@nestjs/common";
import { verifyMessage } from "ethers";

@Injectable()
export class AuthService {
  async verify(message: string, signature: string) {
    try {
      const address = verifyMessage(message, signature);
      return { address };
    } catch (e) {
      throw new Error("Invalid signature");
    }
  }
}
