import { SecondsTohms } from 'utils/secondsTohms';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { SwapStepItemValueProps } from './SwapSteps.type';

dayjs.extend(utc);

function SwapStepValue(props: SwapStepItemValueProps) {
  const { step, column, firstStep } = props;
  const {
    to,
    from,
    estimatedTimeInSeconds,
    executionTimeInSeconds,
    startTime,
  } = step;

  return (
    <div className="flex col-span-4 items-center p-16 text-16">
      {column.title === 'Output Amount' &&
        (isNaN(to?.realAmount) ? (
          <span className="text-neutral-400">{`Est. ~${to.expectedAmount} ${to?.symbol}`}</span>
        ) : (
          <>
            <span className="text-primary-500 mr-5">{`${to.realAmount} ${to?.symbol}`}</span>
            <span className="text-neutral-400">{`(Est. ~${to.expectedAmount} ${to?.symbol})`}</span>
          </>
        ))}
      {column.title === 'Input Amount' &&
        (isNaN(from?.realAmount) ? (
          <span className="text-neutral-400">{`Est. ~${from.expectedAmount} ${from?.symbol}`}</span>
        ) : (
          <>
            <span className="text-primary-500 mr-5">{`${from.realAmount} ${from?.symbol}`}</span>
            {!firstStep && (
              <span className="text-neutral-400">{`(Est. ~${from.expectedAmount} ${from?.symbol})`}</span>
            )}
          </>
        ))}

      {column.title === 'Step Duration' &&
        (executionTimeInSeconds ? (
          <>
            <span className="text-primary-500 mr-5">
              {SecondsTohms(executionTimeInSeconds)}
            </span>
            <span className="text-neutral-400">
              {`(Est. ~${SecondsTohms(estimatedTimeInSeconds)})`}
            </span>
          </>
        ) : (
          <span className="text-neutral-400">
            {`Est. ~${SecondsTohms(estimatedTimeInSeconds)}`}
          </span>
        ))}

      {column.title === 'Step Start Time' && (
        <span className="text-primary-500">
          {startTime &&
            dayjs.utc(startTime).local().format('HH:mm:ss').toString()}
        </span>
      )}
    </div>
  );
}

export default SwapStepValue;
