import { DateRange } from 'react-day-picker';

export interface ModalDatePickerType {
  selectedRange: DateRange | undefined;
  open: boolean;
  onClose: () => void;
  onApply: (newRange: DateRange | undefined) => void;
}
