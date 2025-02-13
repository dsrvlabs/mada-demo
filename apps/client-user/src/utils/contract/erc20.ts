/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ethers } from "ethers";
import ERC20 from "../../abis/Erc20.json";

const contractAddress = process.env.NEXT_PUBLIC_ERC20_CONTRACT || "";

export class ERC20Utils {
  provider: ethers.JsonRpcProvider;
  signer: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY || "");
    this.provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    this.signer = wallet.connect(this.provider);
    this.contract = new ethers.Contract(contractAddress, ERC20.abi, this.signer);
  }

  encodeMintFunctionData(to: string, amount: string): string {
    return this.contract.interface.encodeFunctionData("mint", [to, ethers.parseUnits(amount, 18)]);
  }

  encodeTransferFunctionData(to: string, amount: string): string {
    return this.contract.interface.encodeFunctionData("transfer", [to, ethers.parseUnits(amount, 18)]);
  }
}
