import Image from 'next/image';
import CopyIcon from 'public/icons/copy.svg';
import { CopyText } from 'utils/copyText';
import { SwapStepItemValueProps } from './SwapSteps.type';

function SwapStepAddress(props: SwapStepItemValueProps) {
  const { step, column } = props;
  const {
    sourceWalletAddress,
    destinationWalletAddress,
    sourceWallet,
    destinationWallet,
  } = step;

  let wallet = '';
  let walletAddress = '';

  if (column.title === 'Step Source Wallet') {
    wallet = sourceWallet;
    walletAddress = sourceWalletAddress;
  }

  if (column.title === 'Step Destination Wallet') {
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
    <div className="flex col-span-4 items-center p-16">
      <button onClick={() => handleClick()} className="text-secondary-500 mr-5">
        {wallet.length > 40
          ? `${wallet.slice(0, 20)}...${wallet.slice(
              wallet.length - 20,
              wallet.length,
            )}`
          : wallet}
      </button>
      <button
        onClick={() => handleCopy()}
        className="group relative cursor-pointer">
        <Image height={16} width={16} alt="copy" src={CopyIcon} />
      </button>
    </div>
  );
}

export default SwapStepAddress;
