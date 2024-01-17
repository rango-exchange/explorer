import Link from 'next/link';
import { SwapStepItemValueProps } from './SwapSteps.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

function SwapStepAddress(props: SwapStepItemValueProps) {
  const { step, column } = props;
  const { sourceWallet, destinationWallet } = step;

  const wallet =
    column.title === 'Step Source Wallet' ? sourceWallet : destinationWallet;
  const { address, explorer } = wallet;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    address && (
      <div className="flex col-span-4 items-center md:p-16">
        <Link
          target="_blank"
          href={explorer}
          onClick={handleClick}
          className="text-14 md:text-16 text-secondary-500 mr-5">
          {address?.length > 20 ? `${address.slice(0, 20)}...` : address}
        </Link>
        <ButtonCopyIcon text={address} />
      </div>
    )
  );
}

export default SwapStepAddress;
