import { SummaryType } from 'src/types';

export interface SummaryProps {
  summary: SummaryType;
}

export interface SummaryItemProps {
  value: number;
  title: string;
  prefix?: string;
}
