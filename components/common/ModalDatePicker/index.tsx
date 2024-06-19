import { DateRange } from 'react-day-picker';
import { Button } from '../Button';
import RangeDatePicker from '../RangeDatePicker';
import { Modal } from '../modal';
import { ModalDatePickerType } from './ModalDatePicker.type';
import { useEffect, useState } from 'react';

function ModalDatePicker(props: ModalDatePickerType) {
  const { open, onClose, onApply, selectedRange } = props;
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
    onClose();
  };

  return (
    <Modal
      prefix={
        <button
          onClick={() => setDateRange({ from: undefined, to: undefined })}
          type="button"
          className="text-12 font-medium text-neutral-400">
          Reset
        </button>
      }
      dismissible
      title={'Date Picker'}
      onClose={onClose}
      open={open}>
      <div className="w-full px-20 py-10 max-h-full">
        <div className="max-h-[calc(75vh-141px)] overflow-y-scroll">
          <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        <div className="mt-20 mb-10">
          <Button
            disabled={!hasChange}
            onClick={() => handleApply()}
            className={`!text-18 !py-10 !w-full ${
              !hasChange ? '!bg-neutral-800' : '!bg-primary-600 '
            } `}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDatePicker;
