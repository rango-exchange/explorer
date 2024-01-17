import Link from 'next/link';
import { SwapDetailItem } from './SwapDetail.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

function SwapDetailAddress(props: SwapDetailItem) {
  const { details, column } = props;
  const { sourceWallet, destinationWallet } = details;

  const wallet =
    column.title === 'Source Address' ? sourceWallet : destinationWallet;

  return (
    <div className="flex col-span-3 items-center h-[3.75rem] p-18">
      <Link
        href={wallet?.explorer}
        target="_blank"
        className="text-secondary-500 mr-5">
        {wallet?.address}
      </Link>
      <ButtonCopyIcon tooltipText="Copy Address" text={wallet?.address} />
    </div>
  );
}

export default SwapDetailAddress;
