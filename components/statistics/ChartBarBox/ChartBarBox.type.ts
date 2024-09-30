import { DateRange } from 'react-day-picker';
import { DailySummaryType, StatisticDaysFilter } from 'types';
import { BlockchainMeta } from 'types/meta';
export type ChartType = 'transaction' | 'volume';

export interface PropsType {
  days: StatisticDaysFilter;
  dailySummary: DailySummaryType[];
  type: ChartType;
  blockchains: BlockchainMeta[];
  title: string;
  description: string;
  className?: string;
  dateRange?: DateRange | undefined;
}

export interface ModalFilterType {
  blockchains: BlockchainMeta[];
  selectedFilter: FilterBarChart;
  open: boolean;
  onClose: () => void;
  onApply: (filter: FilterBarChart) => void;
}

export enum BlockchainFilterType {
  'source' = 'source',
  'destination' = 'destination',
}

export interface BlockchainFilterProps {
  blockchains: BlockchainMeta[];
  selectedBlockchain: string;
  onSelect: (selected: string) => void;
}

export interface FilterBarChart {
  source: string;
  destination: string;
  breakDownBy: string;
}

export type BreakDownType = 'None' | 'Source chain' | 'Destination chain';
