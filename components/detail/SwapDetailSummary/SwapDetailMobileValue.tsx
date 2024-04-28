/* eslint-disable @next/next/no-img-element */
import { SecondsTohms } from 'utils/secondsTohms';
import { SwapDetailItem } from './SwapDetail.type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IconStatus from 'components/common/IconStatus';
import { StepsIcon } from 'components/icons';
import Tooltip from 'components/common/Tooltip';

dayjs.extend(utc);

function SwapDetailMobileValue(props: SwapDetailItem) {
  const { details, column } = props;
  const { estimatedTimeInSeconds, status, steps, creationDate } = details;
  const successStep = steps.filter((item) => item.status === 'success').length;
  const currentStep = details.steps.find(
    (step) => step.status === 'running' || step.status === 'unknown',
  );
  const swapper = currentStep?.swapper || steps[steps.length - 1].swapper;

  return (
    <>
      <div className="flex flex-col px-20 py-15">
        <div className="text-12 text-primary-500 mb-5">{column.title}</div>
        {column.title === 'Swap Status' && (
          <div className="flex items-center">
            <div className="flex items-center">
              <IconStatus status={status} hasTitle />
            </div>
            <span className="text-neutral-400 mx-10">|</span>
            {steps?.length && (
              <div className="flex items-center">
                <StepsIcon className="text-neutral-400 mr-5" />
                <span className="text-12 text-neutral-400">{`${successStep}/${steps.length}`}</span>
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
        {column.title === 'Initiation Date And Time' && creationDate && (
          <div className="text-14 text-primary-500">
            {dayjs
              .utc(creationDate)
              .local()
              .format('MMMM DD, YYYY | HH:mm:ss')
              .toString()}
          </div>
        )}
        {column.title === 'Duration' && (
          <div className="text-14 text-neutral-400">
            {`Est. ~${
              estimatedTimeInSeconds
                ? SecondsTohms(estimatedTimeInSeconds)
                : '--'
            }`}
          </div>
        )}
      </div>
      {column.title === 'Initiation Date And Time' && (
        <div className="h-[0.5px] w-full bg-neutral-300"></div>
      )}
    </>
  );
}

export default SwapDetailMobileValue;
