import { ethers } from "ethers";
import type { BigNumberish } from "ethers";

export const formatBalance = (balance: BigNumberish, decimals: number) => {
  const formatted = ethers.formatUnits(balance, decimals);
  return parseInt(formatted, 10).toString();
};
