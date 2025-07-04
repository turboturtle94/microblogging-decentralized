import { Injectable } from "@nestjs/common";
import { verifyMessage } from "ethers";

/**
 * Service responsible for handling authentication logic using Ethereum signatures.
 */
@Injectable()
export class AuthService {
  /**
   * Verifies the signed message to authenticate the user.
   *
   * This method uses the `ethers` library to recover the address from the provided message
   * and signature. If the signature is valid, it returns the recovered wallet address.
   *
   * @param message - The plain text message that was signed by the user's wallet.
   * @param signature - The cryptographic signature generated by the wallet for the given message.
   * @returns An object containing the recovered wallet address.
   * @throws Error if the signature is invalid or verification fails.
   */
  async verify(
    message: string,
    signature: string
  ): Promise<{ address: string }> {
    try {
      const address = verifyMessage(message, signature);
      return { address };
    } catch (e) {
      throw new Error("Invalid signature");
    }
  }
}
