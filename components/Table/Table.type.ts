import { SwapType } from 'types';

export interface OldColumnType {
  title: string;
  key: string;
  render?: (text: string, item: any, index: number) => JSX.Element | string;
  classNameColBody?: string;
  classNameColHead?: string;
  hiddenTitle?: boolean;
}
export interface makeColumnsTypes {
  onClick: (id: string) => void;
}

export interface TableProps {
  makeColumns: ({ onClick }: makeColumnsTypes) => OldColumnType[];
  data: SwapType[];
  onClick: (id: string) => void;
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
  component?: any;
}
