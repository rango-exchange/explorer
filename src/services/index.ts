/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DailySummaryOption } from 'src/types';
import {
  API_URL,
  SEARCH_RESULT_OFFSET,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../constant';

export const getLastSwaps = async () =>
  await fetch(
    `${API_URL}/scanner/tx/latest?count=20&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 30 } },
  )
    .then(async (res) => await res.json())
    .then((data) => data?.transactions || data);

export const getSummary = async () =>
  await fetch(
    `${API_URL}/scanner/summary?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 30 * SECONDS_PER_MINUTE } },
  )
    .then(async (res) => await res.json())
    .then((data) => data);

export const getSearchResult = async (query: string) =>
  await fetch(
    `${API_URL}/scanner/tx/search?query=${query}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { cache: 'no-store' },
  )
    .then(async (res) => await res.json())
    .then((data) => data?.searchResult || data);

export const getWalletSwaps = async (address: string, page?: number) =>
  await fetch(
    `${API_URL}/scanner/tx/wallet?walletAddress=${address}&offset=${SEARCH_RESULT_OFFSET}&page=${
      page || 0
    }&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  ).then(async (res) => await res.json());

export const getTxDetails = async (requestId: string) =>
  await fetch(
    `${API_URL}/scanner/tx/detail?requestId=${requestId}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 30 } },
  )
    .then(async (res) => await res.json())
    .then((data) => data?.detailedTransaction || data);

export const getDailySummary = async (options: DailySummaryOption) => {
  const { days, breakDownBy, source, destination } = options;
  let dailySummaryURL = `${API_URL}/scanner/summary/daily?days=${days}&breakDownBy=${breakDownBy}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;
  if (source) dailySummaryURL += `&source=${source}`;
  if (destination) dailySummaryURL += `&destination=${destination}`;

  return await fetch(dailySummaryURL)
    .then(async (res) => await res.json())
    .then((data) => data?.stats || data);
};

export const getTopListSummary = async (days: number) =>
  await fetch(
    `${API_URL}/scanner/summary/top-lists?days=${days}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data);

export const getBlockchains = async () => {
  return await fetch(
    `${API_URL}/meta/blockchains?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 12 * SECONDS_PER_HOUR } },
  )
    .then(async (res) => await res.json())
    .then((data) => data);
};
