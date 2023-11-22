/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { CellProps } from '../Table.type';
import GasIcon from 'public/icons/gass.svg';

function AmountCell(props: CellProps) {
  const { swapItem } = props;
  const { sourceAmount } = swapItem;

  return (
    <div className="flex flex-col col-span-2 justify-center items-start p-20 ">
      <div className="text-16 text-neutral-400 mb-5">
        {`~$${parseFloat(Number(sourceAmount).toFixed(2))}`}
      </div>
      <div className="flex items-center">
        <Image src={GasIcon} width={16} height={16} alt="gas fee" />
        <span className="text-14 px-5 text-neutral-400">Fee</span>
        <span className="text-14 text-neutral-400">{`$${0.02}`}</span>
      </div>
    </div>
  );
}

export default AmountCell;
