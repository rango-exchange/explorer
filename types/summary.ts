export interface SummaryType {
  totalTxCount: number;
  totalTxVolumeUSD: number;
  connectedWallets: number;
  supportedDexes: number;
  supportedBridges: number;
  supportedChains: number;
  lastUpdateDate: string;
  dailyInterval: DailyIntervalType[];
}

export interface DailyIntervalType {
  date: string;
  count: number;
  volumeUSD: number;
}

export enum BreakDownList {
  'None' = 'TOTAL',
  'Source chain' = 'SOURCE',
  'Destination chain' = 'DESTINATION',
}

export interface DailySummaryType {
  count: number;
  date: string;
  uniqueWallets: number;
  volume: number;
  bucket: string;
}

export interface DailySummaryOption {
  days: number;
  breakDownBy: BreakDownList;
  source?: string;
  destination?: string;
  fromDate?: number;
  toDate?: number;
}

export interface BlockchainMap {
  key: string;
  value: number;
}

export interface BlockchainPathMap {
  key: {
    source: string;
    destination: string;
  };
  value: number;
}

export interface TopListSummaryType {
  topDestinationByTxCount: BlockchainMap[];
  topDestinationByVolume: BlockchainMap[];
  topSourceByTxCount: BlockchainMap[];
  topSourceByVolume: BlockchainMap[];
  topPathsByTxCount: BlockchainPathMap[];
  topPathsByVolume: BlockchainPathMap[];
}

export type StatisticDaysFilter = 7 | 30 | 90;
