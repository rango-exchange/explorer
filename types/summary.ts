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
