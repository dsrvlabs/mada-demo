/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ethers } from "ethers";
import type { ForwardRequest } from "../../types/type";
import { TrustedForwarderUtils } from "../../utils/contract/trustedForwarder";

export class RelayService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor() {
    const privateKey = process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY || "";
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  static async processTransaction(signedTransaction: ForwardRequest): Promise<string> {
    try {
      const forwarder = new TrustedForwarderUtils();
      const result = await forwarder.execute(signedTransaction);

      if (result) {
        return "Transaction executed successfully";
      }
      return "Transaction failed to execute";
    } catch (error) {
      console.error("Error processing transaction:", error);
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  async processBatchTransaction(signedTransactionList: ForwardRequest[]): Promise<string> {
    try {
      const forwarder = new TrustedForwarderUtils();
      const signerAddress = await this.signer.getAddress();

      const result = await forwarder.executeBatch(signedTransactionList, signerAddress);

      if (result) {
        return "Transaction executed successfully";
      }
      return "Transaction failed to execute";
    } catch (error) {
      console.error("Error processing transaction:", error);
      throw new Error(`Transaction failed: ${error}`);
    }
  }
}
