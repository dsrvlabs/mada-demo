/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { EIP1193Provider } from "@web3-onboard/core";
import { ethers } from "ethers";

/*
    About EIP-1193-Provider:
    https://onboard.blocknative.com/docs/overview/introduction
*/
export const getClientProvider = (walletProvider: EIP1193Provider) => {
  return new ethers.BrowserProvider(walletProvider);
};

export const getClientSigner = (walletProvider: EIP1193Provider) => {
  const provider = getClientProvider(walletProvider);
  return provider.getSigner();
};

export const getJsonRpcProvider = (rpcUrl: string) => {
  return new ethers.JsonRpcProvider(rpcUrl);
};

export const getJsonRpcSigner = (rpcUrl: string) => {
  const provider = getJsonRpcProvider(rpcUrl);
  return provider.getSigner();
};
