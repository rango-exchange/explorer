import { ColumnType } from './Table.type';
import AmountCell from './cells/AmountCell';
import RequestIDCell from './cells/RequestIDCell';
import StatusCell from './cells/StatusCell';
import TokenCell from './cells/TokenCell';
import SuccessIcon from 'public/icons/success.svg';
import RunningIcon from 'public/icons/running.svg';
import FailIcon from 'public/icons/fail.svg';

export const columns: ColumnType[] = [
  {
    id: 1,
    title: 'Request ID',
    component: RequestIDCell,
  },
  {
    id: 2,
    title: 'Source Transaction',
    tokenType: 'source',
    component: TokenCell,
  },
  {
    id: 3,
    title: 'Destination Transaction',
    tokenType: 'destination',
    component: TokenCell,
  },
  {
    id: 4,
    title: 'Amount',
    component: AmountCell,
  },

  {
    id: 5,
    title: 'Status',
    component: StatusCell,
  },
];

export const SwapStatusIcon = {
  running: RunningIcon,
  failed: FailIcon,
  success: SuccessIcon,
};
