/* eslint-disable no-await-in-loop */

/* eslint-disable no-plusplus */

/* eslint-disable no-alert */

/* eslint-disable no-underscore-dangle */
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useProvider } from "./useProvider";
import { setAmountList } from "../store/amountslice";
import { ERC20Utils } from "../utils/contract/erc20";
import { TrustedForwarderUtils } from "../utils/contract/trustedForwarder";

export const usePayment = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState<boolean | null>(null);
  const forwarderUtils = useMemo(() => new TrustedForwarderUtils(), []);
  const erc20Utils = useMemo(() => new ERC20Utils(), []);
  const router = useRouter();
  const { provider, initProvider } = useProvider();

  useEffect(() => {
    if (!provider) {
      initProvider();
    }
  }, [provider, initProvider]);

  const signQRInfo = async (items: {
    fertilizer: string;
    shovel: string;
    seeds: string;
    pesticide: string;
  }): Promise<string> => {
    setLoading(true);
    if (!provider) {
      console.log("provider not initialized yet");
      setLoading(false);
      return "null";
    }

    try {
      const voucherData = {
        items: {
          fertilizer: items.fertilizer,
          shovel: items.shovel,
          seeds: items.seeds,
          pesticide: items.pesticide,
        },
      };

      const signer = provider.getSigner();
      const senderAddress = await (await signer).getAddress();

      const domain = {
        name: "TrustedForwarder",
        version: "1",
        chainId: process.env.NEXT_PUBLIC_CHAINID,
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
      let nonce = await forwarderUtils.getNonce(senderAddress);

      const tokenABI = ["function transfer(address to, uint amount) returns (bool)"];

      const tokenContractList = [
        process.env.NEXT_PUBLIC_FERTILIZER_TOKEN_ADDRESS || "",
        process.env.NEXT_PUBLIC_SHOVEL_TOKEN_ADDRESS || "",
        process.env.NEXT_PUBLIC_SEEDS_TOKEN_ADDRESS || "",
        process.env.NEXT_PUBLIC_PESTICIDE_TOKEN_ADDRESS || "",
      ];

      const transferRequests = [];
      const tokenContracts = tokenContractList.map(async (address) => {
        if (!address) {
          throw new Error("ERC20_CONTRACT is not defined");
        }
        return new ethers.Contract(address, tokenABI, await signer);
      });

      const itemKeys = Object.keys(voucherData.items) as (keyof typeof voucherData.items)[];

      for (let i = 0; i < tokenContracts.length; i++) {
        const key = itemKeys[i];
        const tokenContract = tokenContracts[i];
        const transferValue = {
          from: senderAddress,
          to: tokenContractList[i],
          value: BigInt(0),
          gas: BigInt("100000"),
          nonce,
          deadline,
          data: (await tokenContract).interface.encodeFunctionData("transfer", [
            process.env.NEXT_PUBLIC_STORE_ADDRESS,
            ethers.parseUnits(voucherData.items[key]),
          ]),
        };

        const transferSignature = await (
          await signer
        ).signTypedData(domain, { ForwardRequest: types.ForwardRequest }, transferValue);

        transferRequests.push({
          from: transferValue.from,
          to: transferValue.to,
          value: transferValue.value.toString(),
          gas: transferValue.gas.toString(),
          nonce: transferValue.nonce.toString(),
          deadline: transferValue.deadline.toString(),
          data: transferValue.data,
          signature: transferSignature,
        });
        nonce = BigInt(nonce) + BigInt(1);
      }

      return JSON.stringify(transferRequests);
    } catch (error) {
      console.log(error);
      return "null";
    } finally {
      setLoading(false);
    }
  };

  const onClickBatchTransfer = async (transactions: string[]) => {
    setLoading(true);
    try {
      if (!transactions || !Array.isArray(transactions)) {
        throw new Error("Transactions data is invalid");
      }

      // 필드를 문자열로 변환
      const transferRequests = transactions.map((signedTransaction: any) => ({
        ...signedTransaction,
        value: signedTransaction.value.toString(),
        gas: signedTransaction.gas.toString(),
        nonce: signedTransaction.nonce.toString(),
        deadline: signedTransaction.deadline.toString(),
      }));
      // 요청 보내기
      await axios.post("/api/relay/batch", transferRequests);
      setTransferSuccess(true);
      alert("Voucher accepted successfully!");
    } catch (error) {
      console.error("Error in batch transfer:", error);
      setTransferSuccess(false);
      alert("transfer failed!!");
    } finally {
      setLoading(false);
    }
  };

  return {
    amount,
    loading,
    transferSuccess,
    setAmountList,
    onClickBatchTransfer,
    setAmount,
    signQRInfo,
  };
};
