import { DailyIntervalType } from 'types';

import { TickRendererProps } from '@visx/axis';

export interface ChartProps {
  data: DailyIntervalType[];
  days?: number;
}

export type CustomTickProps = TickRendererProps & {
  dxValue?: number;
};

export type DaysFilter = 7 | 30;

export type WeekFilter = 'current' | 'prev';
