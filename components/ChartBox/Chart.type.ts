import { DailyIntervalType } from 'types';

export interface ChartProps {
  data: DailyIntervalType[];
}

export interface WeeklyChartProps {
  currentWeek: DailyIntervalType[];
  prevWeek: DailyIntervalType[];
}

export type DaysFilter = 7 | 30;

export type WeekFilter = 'current' | 'prev';
