import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import type { VoucherData } from "../types/type";

export const useMinting = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const mintVoucherToken = async (
    recipient: string,
    items: { fertilizer: string; shovel: string; seeds: string; pesticide: string },
  ) => {
    setLoading(true);

    const voucherData: VoucherData = {
      address: recipient,
      items: {
        fertilizer: items.fertilizer,
        shovel: items.shovel,
        seeds: items.seeds,
        pesticide: items.pesticide,
      },
    };

    try {
      const response = await axios.post("/api/mint/batch", voucherData);
      console.log("Minting successful:", response.data);
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Mint Voucher token failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    mintVoucherToken,
    loading,
  };
};
