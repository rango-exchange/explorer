import { SecondsTohms } from 'utils/secondsTohms';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { SwapStepItemValueProps } from './SwapSteps.type';

dayjs.extend(utc);

function SwapStepValue(props: SwapStepItemValueProps) {
  const { step, column, firstStep } = props;
  const {
    toAmount,
    fromAmount,
    expectedToAmount,
    expectedFromAmount,
    toAsset,
    fromAsset,
    estimatedTimeInSeconds,
    creationDate,
    executionTimeInSeconds,
  } = step;

  return (
    <div className="flex col-span-4 items-center p-16 text-16">
      {column.title === 'Output Amount' &&
        (toAmount ? (
          <>
            <span className="text-primary-500 mr-5">{`${toAmount} ${toAsset?.symbol}`}</span>
            <span className="text-neutral-400">{`(Est. ~${expectedToAmount} ${toAsset?.symbol})`}</span>
          </>
        ) : (
          <span className="text-neutral-400">{`Est. ~${expectedToAmount} ${toAsset?.symbol}`}</span>
        ))}
      {column.title === 'Input Amount' &&
        (fromAmount ? (
          <>
            <span className="text-primary-500 mr-5">{`${fromAmount} ${fromAsset?.symbol}`}</span>
            {!firstStep && (
              <span className="text-neutral-400">{`(Est. ~${expectedFromAmount} ${fromAsset?.symbol})`}</span>
            )}
          </>
        ) : (
          <span className="text-neutral-400">{`Est. ~${expectedFromAmount} ${fromAsset?.symbol}`}</span>
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
          {creationDate &&
            dayjs.utc(creationDate).local().format('HH:mm').toString()}
        </span>
      )}
    </div>
  );
}

export default SwapStepValue;
