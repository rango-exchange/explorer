export const MATCH_TYPE = {
  ADDRESS: 'ADDRESS',
  REQUESTID: 'REQUESTID',
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
