import { SwapStepItemValueProps } from './SwapSteps.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

function SwapStepAddress(props: SwapStepItemValueProps) {
  const { step, column } = props;
  const { sourceWallet, destinationWallet } = step;

  const wallet =
    column.title === 'Step Source Wallet' ? sourceWallet : destinationWallet;
  const { address, explorer } = wallet;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (explorer) window.open(explorer, '_blank');
  };

  return (
    address && (
      <div className="flex col-span-4 items-center p-16">
        <button onClick={handleClick} className="text-secondary-500 mr-5">
          {address?.length > 40
            ? `${address.slice(0, 20)}...${address.slice(
                address.length - 20,
                address.length,
              )}`
            : address}
        </button>
        <ButtonCopyIcon text={address} />
      </div>
    )
  );
}

export default SwapStepAddress;
