import Image from 'next/image';
import { SwapDetailItem } from './SwapDetail.type';
import CopyIcon from 'public/icons/copy.svg';
import { CopyText } from 'utils/copyText';

function SwapDetailAddress(props: SwapDetailItem) {
  const { details, column } = props;
  const {
    sourceWalletAddress,
    destinationWalletAddress,
    sourceWallet,
    destinationWallet,
  } = details;

  let wallet = '';
  let walletAddress = '';

  if (column.title === 'Source Address') {
    wallet = sourceWallet;
    walletAddress = sourceWalletAddress;
  }

  if (column.title === 'Destination Address') {
    wallet = destinationWallet;
    walletAddress = destinationWalletAddress;
  }

  const handleClick = () => {
    if (walletAddress) window.open(walletAddress, '_blank');
  };

  const handleCopy = () => {
    if (wallet) CopyText(wallet);
  };

  return (
    <div className="flex col-span-3 items-center p-16">
      <button onClick={() => handleClick()} className="text-secondary-500 mr-5">
        {wallet}
      </button>
      <button
        onClick={() => handleCopy()}
        className="group relative cursor-pointer">
        <Image height={16} width={16} alt="copy" src={CopyIcon} />
      </button>
    </div>
  );
}

export default SwapDetailAddress;
