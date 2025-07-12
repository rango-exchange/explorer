import { SecondsTohms } from 'src/utils/secondsTohms';
import { SwapStepItemValueProps } from './SwapSteps.type';
import dynamic from 'next/dynamic';

const LocalDate = dynamic(() => import('src/components/common/LocalDate'), {
  ssr: false,
});

function SwapStepValue(props: SwapStepItemValueProps) {
  const { step, column, firstStep } = props;
  const {
    to,
    from,
    estimatedTimeInSeconds,
    executionTimeInSeconds,
    startTime,
    outputToken,
    failureReason,
  } = step;

  const resultToken = outputToken ? outputToken : to;

  return (
    <div className="flex md:col-span-4 items-center md:p-16 text-14 md:text-16">
      {column.title === 'Output Amount' &&
        (isNaN(resultToken?.realAmount) ? (
          <span className="text-neutral-400">{`Est. ~${to.expectedAmount} ${to?.symbol}`}</span>
        ) : (
          <>
            <span className="text-primary-500 mr-5">
              {`${resultToken.realAmount} ${resultToken?.symbol}`}
            </span>
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
          {startTime && <LocalDate date={startTime} format="HH:mm:ss" />}
        </span>
      )}

      {column.title === 'Failure Info' && (
        <span className="text-failed">{failureReason}</span>
      )}
    </div>
  );
}

export default SwapStepValue;
