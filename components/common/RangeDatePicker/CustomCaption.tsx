import { format } from 'date-fns';
import { CaptionProps, useNavigation } from 'react-day-picker';
import { ChevronRightIcon } from 'components/icons';

function CustomCaption(props: CaptionProps) {
  const { displayMonth } = props;
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const handleNext = () => {
    nextMonth && goToMonth(nextMonth);
  };

  const handlePrevious = () => {
    previousMonth && goToMonth(previousMonth);
  };

  return (
    <div className="flex items-center justify-between py-15">
      <button disabled={!previousMonth} onClick={() => handlePrevious()}>
        <ChevronRightIcon className="rotate-180 text-primary-500 hover:text-hoverIcon" />
      </button>
      <div className="text-14 md:text-16 text-neutral-400 md:text-primary-500 font-medium">
        {format(displayMonth, 'MMM yyy')}
      </div>
      <button disabled={!nextMonth} onClick={() => handleNext()}>
        <ChevronRightIcon className="text-primary-500 hover:text-hoverIcon" />
      </button>
    </div>
  );
}

export default CustomCaption;
