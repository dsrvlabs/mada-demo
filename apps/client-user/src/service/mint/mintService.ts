/* eslint-disable no-await-in-loop */

/* eslint-disable no-underscore-dangle */
import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import type { ForwardRequest, MintData, VoucherData } from "../../types/type";
import { ERC20Utils } from "../../utils/contract/erc20";
import { TrustedForwarderUtils } from "../../utils/contract/trustedForwarder";
import { RelayService } from "../relay/relayService";

dotenv.config();

@Injectable()
export class MintService {
  private erc20Utils: ERC20Utils;
  private forwarderUtils: TrustedForwarderUtils;
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor(private readonly relayService: RelayService) {
    this.erc20Utils = new ERC20Utils();
    this.forwarderUtils = new TrustedForwarderUtils();
    const privateKey = process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY || "";
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  async processMinting(mintData: MintData): Promise<string> {
    const signerAddress = await this.signer.getAddress();

    const domain = {
      name: "TrustedForwarder",
      version: "1",
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
      verifyingContract: process.env.NEXT_PUBLIC_FORWARDER_CONTRACT,
    };

    const types = {
      ForwardRequest: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "gas", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint48" },
        { name: "data", type: "bytes" },
      ],
    };

    const nowInSeconds = Math.floor(Date.now() / 1000);
    const tenMinutesInSeconds = 10 * 60;
    const deadline = BigInt(nowInSeconds + tenMinutesInSeconds);
    const nonce = await this.forwarderUtils.getNonce(signerAddress);

    const value = {
      from: signerAddress,
      to: await this.erc20Utils.contract.getAddress(),
      value: BigInt(0),
      gas: BigInt("100000"),
      nonce,
      deadline,
      data: this.erc20Utils.encodeMintFunctionData(mintData.address, mintData.amount),
    };

    const signature = await this.signer.signTypedData(domain, { ForwardRequest: types.ForwardRequest }, value);

    const signedTransaction: ForwardRequest = {
      from: value.from,
      to: value.to,
      value: value.value.toString(),
      gas: value.gas.toString(),
      nonce: value.nonce.toString(),
      deadline: value.deadline.toString(),
      data: value.data.toString(),
      signature,
    };

    const result = await RelayService.processTransaction(signedTransaction);

    return result;
  }

  async processBatchMinting(voucherData: VoucherData): Promise<string> {
    try {
      const signerAddress = await this.signer.getAddress();

      const domain = {
        name: "TrustedForwarder",
        version: "1",
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
        verifyingContract: process.env.NEXT_PUBLIC_FORWARDER_CONTRACT,
      };

      const types = {
        ForwardRequest: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "gas", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint48" },
          { name: "data", type: "bytes" },
        ],
      };

      const nowInSeconds = Math.floor(Date.now() / 1000);
      const tenMinutesInSeconds = 10 * 60;
      const deadline = BigInt(nowInSeconds + tenMinutesInSeconds);
      let nonce = await this.forwarderUtils.getNonce(signerAddress);

      const tokenABI = ["function mint(address to, uint256 amount)"];

      const tokenContractList = [
        process.env.NEXT_PUBLIC_FERTILIZER_TOKEN_ADDRESS || "",
        process.env.NEXT_PUBLIC_SHOVEL_TOKEN_ADDRESS || "",
        process.env.NEXT_PUBLIC_SEEDS_TOKEN_ADDRESS || "",
        process.env.NEXT_PUBLIC_PESTICIDE_TOKEN_ADDRESS || "",
      ];

      const mintRequests: ForwardRequest[] = [];
      const tokenContracts = tokenContractList.map((address) => {
        if (!address) {
          throw new Error("ERC20_CONTRACT is not defined");
        }
        return new ethers.Contract(address, tokenABI, this.signer);
      });

      const itemKeys = Object.keys(voucherData.items) as (keyof typeof voucherData.items)[];

      for (let i = 0; i < tokenContracts.length; i += 1) {
        const key = itemKeys[i];
        const tokenContract = tokenContracts[i];
        const mintValue = {
          from: signerAddress,
          to: tokenContractList[i] || "",
          value: BigInt(0),
          gas: BigInt("100000"),
          nonce,
          deadline,
          data: tokenContract.interface.encodeFunctionData("mint", [
            voucherData.address,
            ethers.parseUnits(voucherData.items[key], 18),
          ]), // erc20Utils에서 토큰 주소 변수로 받아서 공동 사용할 수 있게 추후 변환 필요
        };

        const mintSignature = await this.signer.signTypedData(
          domain,
          { ForwardRequest: types.ForwardRequest },
          mintValue,
        );

        mintRequests.push({
          from: mintValue.from,
          to: mintValue.to,
          value: mintValue.value.toString(),
          gas: mintValue.gas.toString(),
          nonce: mintValue.nonce.toString(),
          deadline: mintValue.deadline.toString(),
          data: mintValue.data,
          signature: mintSignature,
        });

        nonce = BigInt(nonce) + BigInt(1);
      }

      const result = await this.relayService.processBatchTransaction(mintRequests);

      return result === "Transaction executed successfully"
        ? "Minting executed successfully"
        : `Minting failed to execute: ${result}`;
    } catch (error) {
      console.error("Error processing minting:", error);
      throw new Error(`Minting failed: ${error}`);
    }
  }
}
