import { DatePickerProps } from './RangeDatePicker.types';
import {
  CaptionProps,
  DayContentProps,
  DayMouseEventHandler,
  DayPicker,
  SelectRangeEventHandler,
} from 'react-day-picker';
import { useState } from 'react';
import CustomCaption from './CustomCaption';
import { isAfter } from 'date-fns';
import CustomDayContent from './CustomDayContent';
import { getDaysDifference } from 'utils/common';

function RangeDatePicker(props: DatePickerProps) {
  const { dateRange, setDateRange } = props;

  const [currentDateHover, setCurrentDateHover] = useState<
    Date | null | undefined
  >();

  const isDayDisabled = (date: Date) => {
    // Disable all dates after today
    if (isAfter(date, new Date())) {
      return true;
    }

    if (dateRange?.from && !dateRange.to) {
      return getDaysDifference(dateRange.from, date) >= 120;
    }

    return false;
  };

  const handleSelectDay: SelectRangeEventHandler = (newRange) => {
    // Handle reset the start date if both dates were selected or user selects a new date.
    if (dateRange?.from && dateRange.to && newRange?.from && newRange.to) {
      if (newRange.from.getTime() === dateRange.from.getTime()) {
        setDateRange({ from: newRange.to, to: undefined });
        return;
      }

      if (newRange.to.getTime() === dateRange.to.getTime()) {
        setDateRange({ from: newRange.from, to: undefined });
        return;
      }
    }
    setDateRange(newRange);
  };

  const handleDayMouseEnter: DayMouseEventHandler = (date) => {
    if (
      currentDateHover &&
      date &&
      date.getTime() === currentDateHover.getTime()
    )
      return;
    setCurrentDateHover(date);
  };

  return (
    <DayPicker
      mode="range"
      modifiers={{ disabled: isDayDisabled }}
      classNames={{
        root: 'p-0',
        months: 'md:px-15',
        head_row: 'grid grid-cols-7 ',
        row: 'grid grid-cols-7',
        table:
          'max-w-full w-full md:max-w-[355px] md:w-[355px] h-[220px] align-middle text-center',
        head_cell: 'text-12 py-16 text-primary-500 font-medium',
        cell: 'date-cell text-16 text-neutral-400 p-0',
        day: 'date-button max-w-full w-full h-full border-none py-[3px] md:py-5',
      }}
      selected={dateRange}
      pagedNavigation
      weekStartsOn={1}
      components={{
        Caption: (captionProps: CaptionProps) => (
          <CustomCaption {...captionProps} />
        ),
        DayContent: (dayContentProps: DayContentProps) => (
          <CustomDayContent
            date={dayContentProps?.date}
            range={dateRange}
            isDayDisabled={isDayDisabled}
            currentDateHover={currentDateHover}
          />
        ),
      }}
      onSelect={handleSelectDay}
      onDayMouseEnter={handleDayMouseEnter}
    />
  );
}

export default RangeDatePicker;
