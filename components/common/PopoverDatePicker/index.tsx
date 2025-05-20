import { DateRange } from 'react-day-picker';
import RangeDatePicker from '../RangeDatePicker';
import { PopoverDatePickerType } from './PopoverDatePicker.type';
import { useEffect, useState } from 'react';

function PopoverDatePicker(props: PopoverDatePickerType) {
  const { onApply, selectedRange, className = '', options } = props;
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    selectedRange,
  );

  useEffect(() => {
    setDateRange(selectedRange);
  }, [selectedRange]);

  const hasChange =
    dateRange?.from &&
    dateRange.to &&
    (selectedRange?.from?.getTime() !== dateRange?.from.getTime() ||
      selectedRange?.to?.getTime() !== dateRange?.to?.getTime());

  const handleApply = () => {
    onApply(dateRange);
  };

  return (
    <div
      style={{
        boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.10)',
      }}
      className={`md:absolute md:right-0 md:top-[45px] bg-baseForeground md:z-10 md:rounded-soft ${
        className || ''
      }`}>
      <div className="block text-primary-500 text-12 font-medium px-15 py-12">
        Date Picker
      </div>

      <RangeDatePicker
        dateRange={dateRange}
        setDateRange={setDateRange}
        options={options}
      />

      <div className="hidden md:flex items-center justify-between p-15 mt-20">
        <button
          onClick={() => setDateRange({ from: undefined, to: undefined })}
          className="text-16 font-medium text-neutral-400">
          Reset
        </button>
        <button
          disabled={!hasChange}
          onClick={() => handleApply()}
          className={`text-16 font-medium ${
            hasChange ? 'text-buttonColor' : 'text-neutral-400'
          }`}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default PopoverDatePicker;
