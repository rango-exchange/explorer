import { DateRange } from 'react-day-picker';
import { DatePickerOptions } from '../RangeDatePicker/RangeDatePicker.types';

export interface PopoverDatePickerType {
  selectedRange: DateRange | undefined;
  onApply: (newRange: DateRange | undefined) => void;
  className?: string;
  options?: DatePickerOptions;
}
