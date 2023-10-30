export interface RouteType {
  blockchain: string
  symbol: string
  image: string
  address: string
  decimals: number
  name: string
  blockchainLogo: string
}

export interface StepSummary {
  fromToken: RouteType
  toToken: RouteType
  dstAmount: Number
}
export interface SwapType {
  requestId: string
  transactionTime: string
  status: string
  sourceToken: RouteType
  destination: RouteType
  sourceAmount: number
  destinationAmount: number
  stepsSummary: StepSummary[]
}

export interface AssetType {
  blockchain: string
  symbol: string
  address: string
  blockchainLogo: string
}
export interface ExplorerUrlsType {
  url: string
  description: string
}
export interface ApproveUrlsType {
  txId: string
  url: string
  status: string
}
export interface StepType {
  swapperId: string
  fromAsset: AssetType
  toAsset: AssetType
  toAmount: number
  fromAmount: number
  status: string
  generatedTxId: string[]
  estimatedTimeInSeconds: number
  expectedToAmount: number
  explorerUrls: ExplorerUrlsType[]
  approveUrls: ApproveUrlsType[]
  sourceWallet: string
  destinationWallet: string
  destinationWalletAddress: string
  sourceWalletAddress: string
}

export interface DetailsType {
  requestId: string
  creationDate: string
  verificationState: string
  sourceWallet: string
  destinationWallet: string
  destinationWalletAddress: string
  sourceWalletAddress: string
  destination: RouteType
  from: AssetType
  to: AssetType
  srcAmount: number
  dstAmount: number
  steps: StepType[]
  status: string
  estimatedTimeInSeconds: number
}
