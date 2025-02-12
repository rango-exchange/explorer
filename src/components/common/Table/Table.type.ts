import { SwapType } from 'src/types';

export interface TableProps {
  data: SwapType[];
}

export interface TableBodyProps {
  data: SwapType[];
}

export interface CellProps {
  swapItem: SwapType;
  column: ColumnType;
}

export type TokenType = 'source' | 'destination';

export interface ColumnType {
  id: number;
  title: string;
  tokenType?: TokenType;
  component?: React.ComponentType<CellProps>;
}

export interface TableLoadingProps {
  title: string;
}
