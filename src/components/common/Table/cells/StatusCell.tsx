/* eslint-disable @next/next/no-img-element */
import { StepsIcon } from 'src/components/icons';
import { CellProps } from '../Table.type';
import IconStatus from 'src/components/common/IconStatus';
import Tooltip from 'src/components/common/Tooltip';

function StatusCell(props: CellProps) {
  const { swapItem, column } = props;
  const { status, stepsSummary } = swapItem;
  const successStep = stepsSummary.filter(
    (item) => item.status === 'success',
  ).length;

  const currentStep =
    stepsSummary.find(
      (step) =>
        step.status === 'running' ||
        step.status === 'unknown' ||
        step.status === 'failed',
    ) || stepsSummary[stepsSummary.length - 1];

  const swapper = currentStep?.swapper;

  return (
    <div className="flex flex-col col-span-2 justify-center md:p-15 lg:p-20">
      <div className="md:hidden text-12 mt-25 text-primary-500">
        {column.title}
      </div>
      <div className="flex items-center">
        <IconStatus status={status} hasTitle />
      </div>
      {stepsSummary?.length && (
        <div className="flex items-center md:mt-5">
          <StepsIcon className="text-neutral-400 mr-5" />
          <span className="text-12 md:text-14 text-neutral-400">{`${successStep}/${stepsSummary.length}`}</span>
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
  );
}

export default StatusCell;
