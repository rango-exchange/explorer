import { DailyIntervalType } from 'types';

import { TickRendererProps } from '@visx/axis';

export interface PropsType {
  data: DailyIntervalType[];
}
export interface ChartProps {
  data: DailyIntervalType[];
  days: number;
}

export type ValidDaysFilter = 7 | 30 | 90;
export type validFilterName = 'Week' | 'Month' | 'Season';
export interface DaysFilter {
  days: ValidDaysFilter;
  hasPrevious: boolean;
  name: validFilterName;
}

export type CustomTickProps = TickRendererProps & {
  dxValue?: number;
};

export type WeekFilter = 'current' | 'prev';
