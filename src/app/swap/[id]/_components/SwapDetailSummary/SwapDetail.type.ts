import { DetailsType } from 'src/types';

export interface PropsType {
  id: string;
}

export interface ColumnType {
  id: number;
  title: string;
  component?: React.ComponentType<SwapDetailItem>;
}

export interface SwapDetailItem {
  details: DetailsType;
  column: ColumnType;
}
