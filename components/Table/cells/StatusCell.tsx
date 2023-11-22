/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { CellProps } from '../Table.type';
import { SwapStatusIcon } from '../Table.helper';
import { CapitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

function StatusCell(props: CellProps) {
  const { swapItem } = props;
  const { status } = swapItem;
  const statusIcon = SwapStatusIcon[status];

  return (
    <div className="flex col-span-2 items-center p-20">
      <div
        className={`mr-5 w-[24px] h-[24px] rounded-full flex items-center justify-center bg-bg${CapitalizeFirstLetter(
          status,
        )}`}>
        <Image src={statusIcon} width={24} alt="gas fee" />
      </div>
      <div className={`text-16 text-${status}`}>{status}</div>
    </div>
  );
}

export default StatusCell;
