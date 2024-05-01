/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DailySummaryOption } from 'types';
import { API_URL, SEARCH_RESULT_OFFSET } from '../constant';

export const getLastSwaps = async () =>
  await fetch(
    `${API_URL}/scanner/tx/latest?count=20&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data?.transactions || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });

export const getSummary = async () =>
  await fetch(
    `${API_URL}/scanner/summary?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });

export const getSearchResult = async (query: string) =>
  await fetch(
    `${API_URL}/scanner/tx/search?query=${query}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data?.searchResult || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });

export const getWalletSwaps = async (address: string, page?: number) =>
  await fetch(
    `${API_URL}/scanner/tx/wallet?walletAddress=${address}&offset=${SEARCH_RESULT_OFFSET}&page=${
      page || 0
    }&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });

export const getTxDetails = async (requestId: string) =>
  await fetch(
    `${API_URL}/scanner/tx/detail?requestId=${requestId}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data?.detailedTransaction || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });

export const getDailySummary = async (options: DailySummaryOption) => {
  const { days, breakDownBy, source, destination } = options;
  let dailySummaryURL = `${API_URL}/scanner/summary/daily?days=${days}&breakDownBy=${breakDownBy}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;
  if (source) dailySummaryURL += `&source=${source}`;
  if (destination) dailySummaryURL += `&destination=${destination}`;

  return await fetch(dailySummaryURL)
    .then(async (res) => await res.json())
    .then((data) => data?.stats || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });
};

export const getTopListSummary = async (days: number) =>
  await fetch(
    `${API_URL}/scanner/summary/top-lists?days=${days}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });

export const getBlockchains = async () => {
  return await fetch(
    `${API_URL}/meta/blockchains?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data)
    .catch((error) => {
      console.error('There was an error!', error);
      return { hasError: true, status: error };
    });
};
