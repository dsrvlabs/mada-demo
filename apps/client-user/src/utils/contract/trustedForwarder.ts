/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ethers } from "ethers";
import ERC2771 from "../../abis/TrustedForward.json";
import type { ForwardRequest } from "../../types/type";

export class TrustedForwarderUtils {
  provider: ethers.JsonRpcProvider;
  signer: ethers.Wallet;
  contract: any;

  constructor() {
    const contractAddress = process.env.NEXT_PUBLIC_FORWARDER_CONTRACT || "";
    const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY || "");
    this.provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    this.signer = wallet.connect(this.provider);
    this.contract = new ethers.Contract(contractAddress, ERC2771.abi, this.provider).connect(this.signer);
  }

  async getNonce(owner: string): Promise<ethers.BigNumberish> {
    try {
      const nonce = await this.contract.nonces(owner);
      return nonce;
    } catch (error) {
      console.error("Error getting nonce:", error);
      throw new Error("Failed to get nonce");
    }
  }

  async verify(request: ForwardRequest, signature: string): Promise<boolean> {
    try {
      const result = await this.contract.verify({ ...request, signature });
      return result;
    } catch (error) {
      console.error("Error verifying request:", error);
      throw new Error("Verification failed");
    }
  }

  async execute(request: ForwardRequest): Promise<string> {
    try {
      const tx = await this.contract.execute({ ...request });
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error executing request:", error);
      throw new Error("Execution failed");
    }
  }

  async executeBatch(requestList: ForwardRequest[], address: string): Promise<string> {
    try {
      const tx = await this.contract.executeBatch(requestList, address);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error executing request:", error);
      throw new Error("Execution failed");
    }
  }
}
