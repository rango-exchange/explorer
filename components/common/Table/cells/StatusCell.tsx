import { StepsIcon } from 'components/icons';
import { CellProps } from '../Table.type';
import IconStatus from 'components/common/IconStatus';
import isMobile from 'is-mobile';

function StatusCell(props: CellProps) {
  const { swapItem, column } = props;
  const { status, stepsSummary } = swapItem;
  const successStep = stepsSummary.filter(
    (item) => item.status === 'success',
  ).length;

  const IsMobile = isMobile();

  return (
    <div className="flex flex-col col-span-2 justify-center md:p-20">
      {IsMobile && (
        <div className="text-12 mt-25 text-primary-500">{column.title}</div>
      )}
      <div className="flex items-center">
        <IconStatus status={status} hasTitle />
      </div>
      {stepsSummary?.length && (
        <div className="flex items-center md:mt-5">
          <StepsIcon className="text-neutral-400 mr-5" />
          <span className="text-12 md:text-14 text-neutral-400">{`${successStep}/${stepsSummary.length}`}</span>
        </div>
      )}
    </div>
  );
}

export default StatusCell;
