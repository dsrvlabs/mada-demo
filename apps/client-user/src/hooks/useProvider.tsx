import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { web3auth } from "../config/web3authConfig";

export const useProvider = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const initProvider = useCallback(() => {
    if (web3auth.connected && web3auth.provider) {
      const ethersProvider = new ethers.BrowserProvider(web3auth.provider as ethers.Eip1193Provider);
      setProvider(ethersProvider);
    } else {
      console.log("Web3Auth is not connected yet");
    }
  }, []);

  useEffect(() => {
    initProvider();
  }, [initProvider]);

  const resetProvider = useCallback(() => {
    setProvider(null);
    if (web3auth.connected) {
      web3auth.logout();
    }
  }, []);

  return {
    provider,
    initProvider,
    resetProvider,
  };
};
