import { SwapType } from 'types';

export interface PropsType {
  data: SwapType[];
  query: string;
  total: number;
  page: number;
  status: string;
  setStatus: (value: string) => void;
  filterItems: { title: string; name: string }[];
}
