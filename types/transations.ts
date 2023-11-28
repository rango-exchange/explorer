export interface RouteType {
  blockchain: string;
  symbol: string;
  image: string;
  address: string;
  decimals: number;
  name: string;
  blockchainLogo: string;
}

export type SwapStatus = 'running' | 'failed' | 'success';

export interface StepSummary {
  fromToken: RouteType;
  toToken: RouteType;
  dstAmount: Number;
}
export interface SwapType {
  requestId: string;
  transactionTime: string;
  status: SwapStatus;
  sourceToken: RouteType;
  destinationToken: RouteType;
  sourceAmount: number;
  destinationAmount: number;
  stepsSummary: StepSummary[];
}

export interface AssetType {
  blockchain: string;
  symbol: string;
  address: string;
  blockchainLogo: string;
  name: string;
  image: string;
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
export interface StepType {
  swapperId: string;
  fromAsset: AssetType;
  toAsset: AssetType;
  toAmount: number;
  fromAmount: number;
  status: SwapStatus;
  generatedTxId: string[];
  estimatedTimeInSeconds: number;
  executionTimeInSeconds: number;
  expectedToAmount: number;
  expectedFromAmount: number;
  explorerUrls: ExplorerUrlsType[];
  approveUrls: ApproveUrlsType[];
  sourceWallet: string;
  destinationWallet: string;
  destinationWalletAddress: string;
  sourceWalletAddress: string;
  creationDate: string;
}

export interface DetailsType {
  requestId: string;
  creationDate: string;
  verificationState: string;
  sourceWallet: string;
  destinationWallet: string;
  destinationWalletAddress: string;
  sourceWalletAddress: string;
  destination: RouteType;
  from: AssetType;
  to: AssetType;
  srcAmount: number;
  dstAmount: number;
  steps: StepType[];
  status: SwapStatus;
  estimatedTimeInSeconds: number;
}
