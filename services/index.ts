/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { API_URL, SEARCH_RESULT_OFFSET } from '../constant';

export const getLastSwaps = async () =>
  await fetch(
    `${API_URL}/tx/latest?count=20&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data?.transactions || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return error;
    });

export const getSummary = async () =>
  await fetch(`${API_URL}/summary?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`)
    .then(async (res) => await res.json())
    .then((data) => data)
    .catch((error) => {
      console.error('There was an error!', error);
      return error;
    });

export const getSearchResult = async (query: string) =>
  await fetch(
    `${API_URL}/tx/search?query=${query}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data?.searchResult || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return [];
    });

export const getWalletSwaps = async (address: string, page?: number) =>
  await fetch(
    `${API_URL}/tx/wallet?walletAddress=${address}&offset=${SEARCH_RESULT_OFFSET}&page=${
      page || 0
    }&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  ).then(async (res) => await res.json());

export const getTxDetails = async (requestId: string) =>
  await fetch(
    `${API_URL}/tx/detail?requestId=${requestId}&count=10&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
    .then(async (res) => await res.json())
    .then((data) => data?.detailedTransaction || data)
    .catch((error) => {
      console.error('There was an error!', error);
      return error;
    });
