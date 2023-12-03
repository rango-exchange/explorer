export interface RouteType {
  blockchain: string;
  symbol: string;
  decimals: number;
  name: string;
  blockchainLogo: string;
  blockchainType: string;
  expectedAmount: number;
  logo: string;
  price: number;
  realAmount: number;
}

export type SwapStatus = 'running' | 'failed' | 'success';

export interface StepSummary {
  feeUsd: number;
  status: SwapStatus;
  stepNumber: number;
  fromToken: RouteType;
  toToken: RouteType;
}
export interface SwapType {
  requestId: string;
  transactionTime: string;
  status: SwapStatus;
  stepsSummary: StepSummary[];
}

export interface WalletType {
  address: string;
  explorer: string;
}

export interface AssetType {
  address: string;
  blockchain: string;
  blockchainLogo: string;
  blockchainType: string;
  decimals: 18;
  expectedAmount: number;
  logo: string;
  price: number;
  symbol: string;
  realAmount: number;
  name: string;
}
export interface ExplorerUrlsType {
  url: string;
  description: string;
}
export interface ApproveUrlsType {
  txId: string;
  url: string;
  status: string;
}

export interface SwapperType {
  swapperId: string;
  swapperLogo: string;
  swapperTitle: string;
  swapperType: 'DEX' | 'BRIDGE' | 'AGGREGATOR';
}

export interface InternalPathType {
  swapper: SwapperType;
  from: AssetType;
  to: AssetType;
}
export interface StepType {
  swapper: SwapperType;
  from: AssetType;
  to: AssetType;
  status: SwapStatus;
  generatedTxId: string[];
  internalPath: InternalPathType[];
  estimatedTimeInSeconds: number;
  executionTimeInSeconds: number;
  explorerUrls: ExplorerUrlsType[];
  approveUrls: ApproveUrlsType[];
  sourceWallet: WalletType;
  destinationWallet: WalletType;
  startTime: number;
}

export interface DetailsType {
  requestId: string;
  creationDate: string;
  verificationState: string;
  sourceWallet: WalletType;
  destinationWallet: WalletType;
  from: AssetType;
  to: AssetType;
  steps: StepType[];
  status: SwapStatus;
  estimatedTimeInSeconds: number;
}
