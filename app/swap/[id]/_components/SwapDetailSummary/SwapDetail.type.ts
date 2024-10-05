import { DetailsType } from 'types';

export interface PropsType {
  details: DetailsType;
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
