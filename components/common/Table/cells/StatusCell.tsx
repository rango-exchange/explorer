import { StepsIcon } from 'components/icons';
import { CellProps } from '../Table.type';
import IconStatus from 'components/common/IconStatus';

function StatusCell(props: CellProps) {
  const { swapItem } = props;
  const { status, stepsSummary } = swapItem;
  const successStep = stepsSummary.filter(
    (item) => item.status === 'success',
  ).length;

  return (
    <div className="flex flex-col col-span-2 justify-center p-20">
      <div className="flex items-center">
        <IconStatus status={status} hasTitle />
      </div>
      {stepsSummary?.length && (
        <div className="flex items-center mt-5">
          <StepsIcon className="text-neutral-400 mr-5" />
          <span className="text-14 text-neutral-400">{`${successStep}/${stepsSummary.length}`}</span>
        </div>
      )}
    </div>
  );
}

export default StatusCell;
