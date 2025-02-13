import type { ethers } from "ethers";
import type { GeoJsonProperties } from "geojson";

export type UserInfo = {
  email: string;
  name: string;
};

export type VoucherData = {
  address: string;
  items: {
    fertilizer: string;
    shovel: string;
    seeds: string;
    pesticide: string;
  };
};

export type Inventory = {
  fertilizer: number;
  seeds: number;
  shovel: number;
  pesticide: number;
};

export type Transaction = {
  id: number;
  date: string;
  item: string;
  quantity: number;
};

export type Merchant = {
  id: number;
  name: string;
  address: string;
  age: number;
  location: { lat: number; lng: number };
  inventory: {
    fertilizer: number;
    seeds: number;
    shovel: number;
    pesticide: number;
  };
  transactions: Transaction[];
  region: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type TransferEvent = {
  hash: string;
  from: {
    userId: string;
    walletAddress: string;
    profileImg: string;
  };
  to: {
    userId: string;
    walletAddress: string;
    profileImg: string;
  };
  item: string;
  date: string;
  status: string;
  quantity: string;
};

export type DataItem = {
  region: number;
  volume: string;
};

export type HoverInfo = {
  longitude: number;
  latitude: number;
  point?: Array<number>;
  feature?: GeoJsonProperties;
};

export interface TransferLogItem {
  from: {
    hash: string;
  };
  log_index?: string;
  method?: string;
  timestamp?: string;
  to: {
    hash: string;
  };
  token: {
    address: string;
    name: string;
  };
  total: {
    value: string;
    decimals: string;
  };
  tx_hash: string;
}

export type CustomLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
  index: number;
};

export type RecentTransaction = {
  id: number;
  hash: string;
  from: {
    userId: string;
    walletAddress: string;
    profileImg: string;
  };
  to: {
    userId: string;
    walletAddress: string;
    profileImg: string;
  };
  items: {
    type: string;
    amount: string;
  }[];
  date: string;
  status: string;
};

export type RecentTxsProps = {
  logs: TransferEvent[];
  isLoading: boolean;
};

export type TokenAddress = { address: string; name: string };

export interface SignedTxType {
  from: string;
  to: string;
  value: string;
  gas: string;
  nonce: string;
  deadline: string;
  data: string;
  signature: string;
}

export interface ParameterDataType {
  userId: string;
  userName: string;
  userAddress: string;
  fertilizer: string;
  shovel: string;
  seeds: string;
  pesticide: string;
}

export interface ParsedData {
  requestData: { transferRequests: SignedTxType[]; parameterData: ParameterDataType };
  userPassword: string;
}

export interface Farmer {
  name: string;
  address: string;
  contact: string;
  imageUrl: string;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface FarmerData {
  farmer: Farmer;
  items: Item[];
}

export interface TransactionItems {
  id: number;
  farmer: string;
  farmerAddress: string;
  date: string;
  items: Item[];
  status: string;
}

export type ForwardRequest = {
  from: string;
  to: string;
  value: string; // BigInt를 문자열로 받기
  gas: string; // BigInt를 문자열로 받기
  nonce: string; // BigNumber를 문자열로 받기
  deadline: string; // BigInt를 문자열로 받기
  data: string;
  signature: string;
};

export type MintData = {
  address: string;
  amount: string;
};


export type PaymentFormProps = {
  provider: ethers.BrowserProvider | null;
};

export type DBStructure = {
  counts: number[];
  itemsList: string[];
  amounts: number[];
};
