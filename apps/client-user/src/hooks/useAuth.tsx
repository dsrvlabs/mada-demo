import type { IProvider } from "@web3auth/base";
import type { ethers } from "ethers";
import { useRouter } from "next/router";
// import type { providers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useProvider } from "./useProvider";
import { web3auth } from "../config/web3authConfig";
import type { UserInfo } from "../types/type";

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [web3authInitialized, setWeb3authInitialized] = useState(false);
  const { provider, initProvider, resetProvider } = useProvider();

  const loadFromLocalStorage = useCallback(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    const savedAddress = localStorage.getItem("address");

    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo) as UserInfo);
    }

    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const saveToLocalStorage = useCallback((user: UserInfo, userAddress: string) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("address", userAddress);
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("address");
  }, []);

  const initWeb3auth = useCallback(async () => {
    try {
      console.log(web3authInitialized);
      if (!web3authInitialized && !web3auth.provider) {
        await web3auth.initModal();
        setWeb3authInitialized(true);
      } else {
        console.log("Web3Auth already initialized");
      }
    } catch (error) {
      console.error("Initialization failed:", error);
    }
  }, [web3authInitialized]);

  const initializeUserInfo = useCallback(
    async (ethersProvider: ethers.BrowserProvider) => {
      try {
        const user = await web3auth.getUserInfo();
        const userInfo = {
          email: user.email || "",
          name: user.name || "",
        };
        setUserInfo(userInfo);

        const signer = ethersProvider.getSigner();
        const userAddress: string = await (await signer).getAddress();
        setAddress(userAddress);
        saveToLocalStorage(userInfo, userAddress);
      } catch (error) {
        console.error("User initialization failed:", error);
      }
    },
    [saveToLocalStorage],
  );

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  useEffect(() => {
    const init = async () => {
      try {
        await initWeb3auth();
        const web3authProvider: IProvider | null = await web3auth.connect();
        if (web3authProvider) {
          initProvider();
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };

    init();
  }, [initWeb3auth, initProvider]);

  useEffect(() => {
    if (provider) {
      initializeUserInfo(provider);
      setLoggedIn(true);
    }
  }, [provider, initializeUserInfo]);

  const login = useCallback(async () => {
    try {
      console.log(web3auth.provider);
      if (!web3auth.provider) {
        await initWeb3auth();
        const web3authProvider: IProvider | null = await web3auth.connect();
        if (web3authProvider) {
          initProvider();
        }
      }
      setLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, [initProvider, initWeb3auth]);

  const logout = useCallback(async () => {
    try {
      await web3auth.logout();
      resetProvider();
      setLoggedIn(false);
      setUserInfo(null);
      setAddress(null);
      clearLocalStorage();
      setWeb3authInitialized(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [resetProvider, clearLocalStorage]);

  return {
    loggedIn,
    userInfo,
    address,
    login,
    logout,
    initWeb3auth,
  };
};
