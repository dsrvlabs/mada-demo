import { ethers } from "ethers";
import { useEffect, useState } from "react";
import type { TokenAddress, TransferEvent, TransferLogItem } from "../types/type";

const useFetchRecentTxs = (tokenAddresses: TokenAddress[] | string) => {
  const [logs, setLogs] = useState<TransferEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTransferLogs = async () => {
    let tokenArray: TokenAddress[];

    if (typeof tokenAddresses === "string") {
      tokenArray = [{ address: tokenAddresses, name: "DSRV" }];
    } else {
      tokenArray = tokenAddresses;
    }

    if (tokenArray.length === 0) {
      console.error("Token addresses are missing");
      return;
    }

    try {
      const logs = await Promise.all(
        tokenArray.map(async (token) => {
          const url = `https://explorer-devnet.payment.dsrvlabs.dev/api/v2/tokens/${token.address}/transfers`;
          console.log(`Fetching data from: ${url}`);

          const response = await fetch(url);
          if (!response.ok) {
            console.error(`Failed to fetch data for ${token.address}: ${response.statusText}`);
            return [];
          }

          const data = await response.json();
          if (!data || !data.items) {
            console.error(`Unexpected API response format for ${token.address}`, data);
            return []; // 🚀 items가 없을 경우 빈 배열 반환
          }

          return data.items.map((item: TransferLogItem) => {
            const timestamp = item.timestamp ? new Date(item.timestamp) : null;
            const koreanTime = timestamp
              ? new Date(timestamp.getTime() + 9 * 60 * 60 * 1000).toISOString().split(".")[0].replace("T", " ")
              : null;
            return {
              hash: item.tx_hash,
              from: {
                userId: "1",
                walletAddress: item.from?.hash || "Unknown",
                profileImg: "",
              },
              to: {
                userId: "12",
                walletAddress: item.to?.hash || "Unknown",
                profileImg: "",
              },
              item: token.name,
              date: koreanTime,
              status: "completed",
              quantity: item.total?.value ? ethers.formatUnits(item.total.value, item.total.decimals) : "0",
            };
          });
        }),
      );

      const flattenedLogs = logs.flat();
      setLogs((prevLogs) => {
        const newLogs = flattenedLogs.filter(
          (log: any) => !prevLogs.some((prevLog) => prevLog.hash === log.hash && prevLog.item === log.item),
        );
        return [...newLogs, ...prevLogs];
      });
    } catch (error) {
      console.error("Error fetching transfer logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransferLogs();
    const interval = setInterval(fetchTransferLogs, 1000);
    return () => clearInterval(interval);
  }, [tokenAddresses]);

  return { logs, isLoading };
};

export default useFetchRecentTxs;
