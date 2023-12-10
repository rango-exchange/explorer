import { ColumnType } from './SwapDetail.type';
import SwapDetailValue from './SwapDetailValue';
import SwapDetailAddress from './SwapDetailAddress';
import SwapDetailChain from './SwapDetailChain';
import SwapDetailMobileToken from './SwapDetailMobileToken';
import SwapDetailMobileValue from './SwapDetailMobileValue';

export const DesktopColumns: ColumnType[] = [
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
    title: 'Output Amount',
    component: SwapDetailValue,
  },
  {
    id: 4,
    title: 'Source Address',
    component: SwapDetailAddress,
  },
  {
    id: 5,
    title: 'Source Token',
    component: SwapDetailChain,
  },
  {
    id: 6,
    title: 'Destination Address',
    component: SwapDetailAddress,
  },
  {
    id: 7,
    title: 'Destination Token',
    component: SwapDetailChain,
  },
  {
    id: 8,
    title: 'Duration',
    component: SwapDetailValue,
  },
  {
    id: 9,
    title: 'Initiation Date And Time',
    component: SwapDetailValue,
  },
];

export const mobileColumns: ColumnType[] = [
  {
    id: 1,
    title: 'Swap Status',
    component: SwapDetailMobileValue,
  },
  {
    id: 2,
    title: 'input',
    component: SwapDetailMobileToken,
  },
  {
    id: 3,
    title: 'output',
    component: SwapDetailMobileToken,
  },
  {
    id: 4,
    title: 'Initiation Date And Time',
    component: SwapDetailMobileValue,
  },
  {
    id: 5,
    title: 'Duration',
    component: SwapDetailMobileValue,
  },
];
