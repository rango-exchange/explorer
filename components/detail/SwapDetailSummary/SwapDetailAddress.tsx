import { SwapDetailItem } from './SwapDetail.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

function SwapDetailAddress(props: SwapDetailItem) {
  const { details, column } = props;
  const { sourceWallet, destinationWallet } = details;

  const wallet =
    column.title === 'Source Address' ? sourceWallet : destinationWallet;

  const handleClick = () => {
    if (wallet?.explorer) window.open(wallet.explorer, '_blank');
  };

  return (
    <div className="flex col-span-3 items-center h-[3.75rem] p-18">
      <button onClick={() => handleClick()} className="text-secondary-500 mr-5">
        {wallet?.address}
      </button>
      <ButtonCopyIcon text={wallet?.address} />
    </div>
  );
}

export default SwapDetailAddress;
