export type SummaryType = {
  totalTxCount: number
  totalTxVolumeUSD: number
  connectedWallets: number
  supportedDexes: number
  supportedBridges: number
  supportedChains: number
  lastUpdateDate: string
  dailyInterval: Array<DailyIntervalType>
}

export type DailyIntervalType = {
  date: string
  count: number
  volumeUSD: number
}
