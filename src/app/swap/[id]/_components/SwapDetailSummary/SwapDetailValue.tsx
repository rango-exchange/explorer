/* eslint-disable @next/next/no-img-element */
import { SecondsTohms } from 'src/utils/secondsTohms';
import { SwapDetailItem } from './SwapDetail.type';
import IconStatus from 'src/components/common/IconStatus';
import { StepsIcon } from 'src/components/icons';
import Tooltip from 'src/components/common/Tooltip';
import dynamic from 'next/dynamic';

const LocalDate = dynamic(() => import('src/components/common/LocalDate'), {
  ssr: false,
});

function SwapDetailValue(props: SwapDetailItem) {
  const { details, column } = props;
  const { estimatedTimeInSeconds, status, steps, creationDate } = details;

  const from = steps?.length ? steps[0].from : null;
  const to = steps?.length ? steps[steps.length - 1].to : null;
  const successStep = steps.filter((item) => item.status === 'success').length;
  const currentStep =
    details.steps.find(
      (step) =>
        step.status === 'running' ||
        step.status === 'unknown' ||
        step.status === 'failed',
    ) || details.steps[details.steps.length - 1];
  const swapper = currentStep?.swapper || steps[steps.length - 1].swapper;

  return (
    <div className="flex col-span-3 items-center p-18 h-[3.75rem] text-16">
      {column.title === 'Swap Status' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <IconStatus status={status} hasTitle />
          </div>
          {steps?.length && (
            <div className="flex items-center mt-5">
              <StepsIcon className="text-neutral-400 mr-5" />
              <span className="text-14 text-neutral-400">{`${successStep}/${steps.length}`}</span>
              &nbsp;&nbsp;
              {swapper && (
                <Tooltip label={swapper?.swapperTitle}>
                  <img
                    src={swapper?.swapperLogo}
                    alt={swapper?.swapperTitle}
                    width={20}
                    height={20}
                  />
                </Tooltip>
              )}
            </div>
          )}
        </div>
      )}
      {column.title === 'Input Amount' && from && (
        <span className="text-primary-500">{`${from?.realAmount} ${from?.symbol}`}</span>
      )}
      {column.title === 'Output Amount' &&
        to &&
        (isNaN(to.realAmount) ? (
          <span className="text-neutral-400">{`Est. ~${to?.expectedAmount} ${to?.symbol}`}</span>
        ) : (
          <span className="text-neutral-500">{`${to.realAmount} ${to?.symbol}`}</span>
        ))}
      {column.title === 'Duration' && (
        <span className="text-neutral-400">
          {`Est. ~${
            estimatedTimeInSeconds ? SecondsTohms(estimatedTimeInSeconds) : '--'
          }`}
        </span>
      )}
      {column.title === 'Initiation Date And Time' && creationDate && (
        <span className="text-primary-500">
          <LocalDate date={creationDate} />
        </span>
      )}
    </div>
  );
}

export default SwapDetailValue;
