import { isAfter, isBefore } from 'date-fns';
import { DayContentPropsType } from './RangeDatePicker.types';
import { useMemo } from 'react';

function CustomDayContent(props: DayContentPropsType) {
  const { date, range, isDayDisabled, currentDateHover } = props;
  const todayDate = new Date().setHours(0, 0, 0, 0);

  const hasRangeCellTemporaryBackgroundHover = useMemo(() => {
    if (!currentDateHover || !range?.from || range?.to) return false;

    if (isAfter(date, range?.from) && isBefore(date, currentDateHover))
      return true;

    if (isBefore(date, range?.from) && isAfter(date, currentDateHover))
      return true;

    return false;
  }, [date, currentDateHover, range?.from, range?.to]);

  const hasCurrentCellAfterBackgroundHover = useMemo(() => {
    if (
      range?.from &&
      !range?.to &&
      currentDateHover &&
      date.getTime() === currentDateHover.getTime()
    ) {
      return isAfter(date, range.from);
    }

    return false;
  }, [range?.from, range?.to, currentDateHover, date]);

  const hasCurrentCellBeforeBackgroundHover = useMemo(() => {
    if (
      range?.from &&
      !range?.to &&
      currentDateHover &&
      date.getTime() === currentDateHover.getTime()
    ) {
      return isBefore(date, range.from);
    }

    return false;
  }, [range?.from, range?.to, currentDateHover, date]);

  const hasStartCellAfterTemporaryBackgroundHover = useMemo(() => {
    if (
      range?.from &&
      !range.to &&
      currentDateHover &&
      date.getTime() === range?.from?.getTime()
    ) {
      return isAfter(range.from, currentDateHover);
    }

    return false;
  }, [range?.from, range?.to, currentDateHover, date]);

  const hasStartCellBeforeTemporaryBackgroundHover = useMemo(() => {
    if (
      range?.from &&
      !range.to &&
      currentDateHover &&
      date.getTime() === range?.from?.getTime()
    ) {
      return isBefore(range.from, currentDateHover);
    }

    return false;
  }, [range?.from, range?.to, currentDateHover, date]);

  const hasEndCellBackgroundHover = useMemo(() => {
    if (
      range?.to &&
      range.from?.getDate() !== range.to.getDate() &&
      date.getTime() === range?.to?.getTime()
    ) {
      return true;
    }

    return false;
  }, [range?.from, range?.to, date]);

  const hasStartCellPermanentBackgroundHover = useMemo(() => {
    if (
      range?.from &&
      range.to &&
      range.from?.getDate() !== range.to.getDate() &&
      date.getTime() === range?.from?.getTime()
    ) {
      return true;
    }

    return false;
  }, [range?.from, range?.to, date]);

  const hasRangeCellPermanentBackgroundHover = useMemo(() => {
    if (
      range?.from &&
      range.to &&
      isAfter(date, range.from) &&
      isBefore(date, range?.to)
    ) {
      return true;
    }

    return false;
  }, [range?.from, range?.to, date]);

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div
        className={`w-[3px] md:w-[5px] shrink-0 h-full ${
          hasStartCellAfterTemporaryBackgroundHover ||
          hasEndCellBackgroundHover ||
          hasCurrentCellAfterBackgroundHover ||
          hasRangeCellTemporaryBackgroundHover ||
          hasRangeCellPermanentBackgroundHover
            ? 'bg-overlay'
            : ''
        }`}></div>
      <div
        className={`w-full h-full flex items-center justify-center ${
          hasStartCellPermanentBackgroundHover
            ? 'bg-overlay rounded-s-full'
            : ''
        } ${
          hasStartCellAfterTemporaryBackgroundHover
            ? 'bg-overlay rounded-e-full'
            : ''
        } ${
          hasStartCellBeforeTemporaryBackgroundHover
            ? 'bg-overlay rounded-s-full'
            : ''
        } ${hasEndCellBackgroundHover ? 'bg-overlay rounded-e-full' : ''} ${
          hasCurrentCellAfterBackgroundHover ? 'bg-overlay rounded-e-full' : ''
        } ${
          hasCurrentCellBeforeBackgroundHover ? 'bg-overlay rounded-s-full' : ''
        } ${hasRangeCellTemporaryBackgroundHover ? 'bg-overlay' : ''} ${
          hasRangeCellPermanentBackgroundHover ? 'bg-overlay' : ''
        }`}>
        <div
          className={`aspect-square w-full h-auto flex items-center justify-center rounded-full hover:bg-hoverBackground hover:text-neutral-400 ${
            date.getTime() === range?.from?.getTime() ||
            date.getTime() === range?.to?.getTime()
              ? '!bg-secondary-500 !text-baseForeground'
              : ''
          } ${
            date.getTime() === todayDate
              ? 'border border-solid border-neutral-400'
              : ''
          } ${
            isDayDisabled(date)
              ? '!text-neutral-800 cursor-not-allowed !bg-transparent'
              : ''
          }`}>
          {date.getDate()}
        </div>
      </div>
      <div
        className={`w-[3px] md:w-[5px] shrink-0 h-full ${
          hasStartCellPermanentBackgroundHover ||
          hasStartCellBeforeTemporaryBackgroundHover ||
          hasCurrentCellBeforeBackgroundHover ||
          hasRangeCellTemporaryBackgroundHover ||
          hasRangeCellPermanentBackgroundHover
            ? 'bg-overlay'
            : ''
        }`}></div>
    </div>
  );
}

export default CustomDayContent;
