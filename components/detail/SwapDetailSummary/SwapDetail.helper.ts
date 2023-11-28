import { ColumnType } from './SwapDetail.type';
import SwapDetailValue from './SwapDetailValue';
import SwapDetailAddress from './SwapDetailAddress';
import SwapDetailChain from './SwapDetailChain';

export const columns: ColumnType[] = [
  {
    id: 1,
    title: 'Swap Status',
    component: SwapDetailValue,
  },
  {
    id: 2,
    title: 'Input Amount',
    component: SwapDetailValue,
  },
  {
    id: 3,
    title: 'Source Address',
    component: SwapDetailAddress,
  },
  {
    id: 4,
    title: 'Source Chain',
    component: SwapDetailChain,
  },
  {
    id: 5,
    title: 'Destination Address',
    component: SwapDetailAddress,
  },
  {
    id: 6,
    title: 'Destination Chain',
    component: SwapDetailChain,
  },
  {
    id: 7,
    title: 'Duration',
    component: SwapDetailValue,
  },
  {
    id: 8,
    title: 'Output Amount',
    component: SwapDetailValue,
  },
  {
    id: 9,
    title: 'Initiation Date And Time',
    component: SwapDetailValue,
  },
];
