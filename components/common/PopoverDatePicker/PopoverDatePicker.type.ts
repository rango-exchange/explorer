import { DateRange } from 'react-day-picker';

export interface PopoverDatePickerType {
  selectedRange: DateRange | undefined;
  onApply: (newRange: DateRange | undefined) => void;
  className?: string;
}
