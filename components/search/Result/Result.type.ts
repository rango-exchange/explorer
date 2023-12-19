import { SwapType } from 'types';

export interface PropsType {
  data: SwapType[];
  query: string;
  total: number;
  page: number;
}
