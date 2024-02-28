import { SwapType } from 'types';

export interface PropsType {
  data: SwapType[];
  total: number;
  page: number;
  status: string;
  setStatus: (value: string) => void;
  filterItems: { title: string; name: string }[];
}
