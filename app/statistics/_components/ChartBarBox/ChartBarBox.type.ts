import { DailySummaryType, StatisticDaysFilter } from 'types';
import { BlockchainMeta } from 'types/meta';
import { SeriesPoint } from '@visx/shape/lib/types';

export type ChartType = 'transaction' | 'volume';

export interface PropsType {
  days: StatisticDaysFilter;
  dailySummary: DailySummaryType[];
  type: ChartType;
  blockchains: BlockchainMeta[];
  title: string;
  description: string;
  className?: string;
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

export type BarStackDataType = {
  [key: string]: string;
};

export type ColorBlockchainMapType = Map<string, string>;

export interface BarChartProps {
  data: BarStackDataType[];
  type: ChartType;
  days: StatisticDaysFilter;
  width: number;
  height: number;
  colorBlockchainMap: ColorBlockchainMapType;
  buckets: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
}

export type BreakDownType = 'None' | 'Source chain' | 'Destination chain';

export type TooltipDataType = {
  bar: {
    bar: SeriesPoint<BarStackDataType>;
    key: string;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
  };
  hoveredIndex: number;
};
