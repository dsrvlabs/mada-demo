import type { ChainNamespaceType } from "@web3auth/base";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";

const chainConfig = {
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || "0xa455",
  rpcTarget: process.env.NEXT_PUBLIC_RPC_URL || "null",
  chainNamespace: CHAIN_NAMESPACES.EIP155 as ChainNamespaceType,
  displayName: process.env.NEXT_PUBLIC_DISPLAY_NAME || "Ethereum Sepolia Testnet",
  blockExplorerUrl: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || "https://sepolia.etherscan.io",
  ticker: process.env.NEXT_PUBLIC_TICKER || "ETH",
  tickerName: process.env.NEXT_PUBLIC_TICKER_NAME || "Ethereum",
  logo: process.env.NEXT_PUBLIC_LOGO_URL || "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID || "null";

export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});
