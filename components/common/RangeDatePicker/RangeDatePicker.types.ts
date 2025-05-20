import { DateRange, DayContentProps } from 'react-day-picker';

export interface DatePickerOptions {
  maximumAcceptableDays?: number;
}

export interface DatePickerProps {
  dateRange: DateRange | undefined;
  setDateRange: (newRange: DateRange | undefined) => void;
  options?: DatePickerOptions;
}

export type DayContentPropsType = {
  date: DayContentProps['date'];
  range: DateRange | undefined;
  isDayDisabled: (date: Date) => boolean;
  currentDateHover: Date | null | undefined;
};
