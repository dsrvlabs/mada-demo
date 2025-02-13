import type { BigNumberish } from "ethers";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useProvider } from "./useProvider";
import { formatBalance } from "../utils/formatBalance";

export const useBalance = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [fertilizerbalance, setFertilizerBalance] = useState<string | null>(null);
  const [shovelbalance, setShovelBalance] = useState<string | null>(null);
  const [seedsbalance, setSeedsBalance] = useState<string | null>(null);
  const [pesticidebalance, setPesticideBalance] = useState<string | null>(null);
  const { provider, initProvider } = useProvider();
  const { address } = useAuth();

  const tokenABI = ["function balanceOf(address account) view returns (uint256)"];

  const fertilizerAddress = process.env.NEXT_PUBLIC_FERTILIZER_TOKEN_ADDRESS || "";
  const shovelAddress = process.env.NEXT_PUBLIC_SHOVEL_TOKEN_ADDRESS || "";
  const seedAddress = process.env.NEXT_PUBLIC_SEEDS_TOKEN_ADDRESS || "";
  const pesticideAddress = process.env.NEXT_PUBLIC_PESTICIDE_TOKEN_ADDRESS || "";

  const loadFromLocalStorage = () => {
    const savedBalance = localStorage.getItem("balance");
    const savedFertilizerBalance = localStorage.getItem("fertilizerbalance");
    const savedShovelBalance = localStorage.getItem("shovelbalance");
    const savedSeedsBalance = localStorage.getItem("seedsbalance");
    const savedPesticideBalance = localStorage.getItem("pesticidebalance");

    if (savedBalance) setBalance(savedBalance);
    if (savedFertilizerBalance) setFertilizerBalance(savedFertilizerBalance);
    if (savedShovelBalance) setShovelBalance(savedShovelBalance);
    if (savedSeedsBalance) setSeedsBalance(savedSeedsBalance);
    if (savedPesticideBalance) setPesticideBalance(savedPesticideBalance);
  };

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const fetchVoucherBalances = useCallback(
    async (address: string) => {
      if (provider) {
        const fertilizerContract = new ethers.Contract(fertilizerAddress, tokenABI, provider);
        const fertilizerBalance: BigNumberish = await fertilizerContract.balanceOf(address);
        const formattedFertilizerBalance = formatBalance(fertilizerBalance, 18);
        setFertilizerBalance(formattedFertilizerBalance);
        saveToLocalStorage("fertilizerbalance", formattedFertilizerBalance);

        const shovelContract = new ethers.Contract(shovelAddress, tokenABI, provider);
        const shovelBalance: BigNumberish = await shovelContract.balanceOf(address);
        const formattedShovelBalance = formatBalance(shovelBalance, 18);
        setShovelBalance(formattedShovelBalance);
        saveToLocalStorage("shovelbalance", formattedShovelBalance);

        const seedContract = new ethers.Contract(seedAddress, tokenABI, provider);
        const seedsBalance: BigNumberish = await seedContract.balanceOf(address);
        const formattedSeedsBalance = formatBalance(seedsBalance, 18);
        setSeedsBalance(formattedSeedsBalance);
        saveToLocalStorage("seedsbalance", formattedSeedsBalance);

        const pesticideContract = new ethers.Contract(pesticideAddress, tokenABI, provider);
        const pesticideBalance: BigNumberish = await pesticideContract.balanceOf(address);
        const formattedPesticideBalance = formatBalance(pesticideBalance, 18);
        setPesticideBalance(formattedPesticideBalance);
        saveToLocalStorage("pesticidebalance", formattedPesticideBalance);
      }
    },
    [provider, fertilizerAddress, shovelAddress, seedAddress, pesticideAddress, tokenABI],
  );

  useEffect(() => {
    loadFromLocalStorage();
    if (!provider) {
      initProvider();
    }
  }, [provider, initProvider]);

  useEffect(() => {
    if (provider && address) {
      fetchVoucherBalances(address);
    }
  }, [provider, address, fetchVoucherBalances]);

  return {
    fertilizerbalance,
    seedsbalance,
    shovelbalance,
    pesticidebalance,
    fetchVoucherBalances,
  };
};
