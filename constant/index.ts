import { StatisticDaysFilter } from 'types';

export const MATCH_TYPE = {
  ADDRESS: 'ADDRESS',
  REQUESTID: 'REQUESTID',
  TXHASH: 'TXHASH',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const STATUS: any = {
  success: 'success',
  failed: 'failed',
  running: 'running',
  unknown: 'Pending',
  null: 'Pending',
};

export const SEARCH_RESULT_OFFSET = 14;

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const DEFAULT_TOKEN_LOGO =
  'https://app.rango.exchange/coins/unknown.png';

export const DEFAULT_STATISTIC_DAYS: StatisticDaysFilter = 90;
