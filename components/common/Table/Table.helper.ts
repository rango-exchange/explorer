import { ColumnType } from './Table.type';
import AmountCell from './cells/AmountCell';
import RequestIDCell from './cells/RequestIDCell';
import StatusCell from './cells/StatusCell';
import TokenCell from './cells/TokenCell';

export const columns: ColumnType[] = [
  {
    id: 1,
    title: 'Request ID',
    component: RequestIDCell,
  },
  {
    id: 2,
    title: 'Source Token',
    tokenType: 'source',
    component: TokenCell,
  },
  {
    id: 3,
    title: 'Destination Token',
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
