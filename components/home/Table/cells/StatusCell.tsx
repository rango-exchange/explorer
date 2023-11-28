/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
import { CellProps } from '../Table.type';
import IconStatus from 'components/common/IconStatus';

function StatusCell(props: CellProps) {
  const { swapItem } = props;
  const { status } = swapItem;

  return (
    <div className="flex col-span-2 items-center p-20">
      <IconStatus status={status} hasTitle />
    </div>
  );
}

export default StatusCell;
