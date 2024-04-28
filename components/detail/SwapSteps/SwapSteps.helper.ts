import SwapStepAddress from './SwapStepAddress';
import SwapStepValue from './SwapStepValue';
import { ColumnType } from './SwapSteps.type';

export const columns: ColumnType[] = [
  {
    id: 1,
    title: 'Input Amount',
    component: SwapStepValue,
  },
  {
    id: 2,
    title: 'Output Amount',
    component: SwapStepValue,
  },
  {
    id: 3,
    title: 'Step Source Wallet',
    component: SwapStepAddress,
  },
  {
    id: 4,
    title: 'Step Destination Wallet',
    component: SwapStepAddress,
  },
  {
    id: 5,
    title: 'Step Start Time',
    component: SwapStepValue,
  },
  {
    id: 6,
    title: 'Step Duration',
    component: SwapStepValue,
  },
  {
    id: 7,
    title: 'Failure Info',
    component: SwapStepValue,
  },
];

export const BorderColor = {
  running: 'border-running',
  failed: 'border-failed',
  success: 'border-success',
  unknown: '',
};
