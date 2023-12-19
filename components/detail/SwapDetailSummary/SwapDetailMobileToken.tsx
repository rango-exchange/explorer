/* eslint-disable @next/next/no-img-element */
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';
import { SwapDetailItem } from './SwapDetail.type';

function SwapDetailMobileToken(props: SwapDetailItem) {
  const { details, column } = props;
  const { steps, sourceWallet, destinationWallet } = details;

  const from = steps?.length ? steps[0].from : null;
  const to = steps?.length ? steps[steps.length - 1].to : null;
  const token = column.title === 'input' ? from : to;
  const {
    blockchain,
    symbol,
    blockchainLogo,
    logo,
    name,
    realAmount,
    expectedAmount,
  } = token || {};

  const wallet = column.title === 'input' ? sourceWallet : destinationWallet;

  const handleClick = () => {
    if (wallet?.explorer) window.open(wallet.explorer, '_blank');
  };

  return (
    <div className="p-10 mb-10 rounded-micro bg-surfacesBackground">
      <div className="flex flex-col p-10">
        <div className="text-12 text-primary-500 mb-5">
          {column.title === 'input' ? 'Input Amount' : 'Output Amount'}
        </div>
        {column.title === 'input' && (
          <div className="text-14 text-primary-500">{`${realAmount} ${symbol}`}</div>
        )}

        {column.title === 'output' && (
          <>
            {isNaN(Number(realAmount)) ? (
              <div className="text-14 text-neutral-400">{`Est. ~${expectedAmount} ${symbol}`}</div>
            ) : (
              <div className="text-14 text-neutral-500">{`${realAmount} ${symbol}`}</div>
            )}
          </>
        )}
      </div>

      <div className="h-[0.5px] my-10 w-full bg-neutral-300"></div>

      <div className="flex flex-col p-10">
        <div className="text-12 text-primary-500">
          {column.title === 'input' ? 'Source Address' : 'Destination Address '}
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handleClick()}
            className="text-14 text-secondary-500 mr-5">
            {wallet?.address.slice(0, 20)}...
          </button>
          <ButtonCopyIcon text={wallet?.address} />
        </div>
      </div>

      <div className="h-[0.5px] my-10 w-full bg-neutral-300"></div>

      <div className="flex flex-col p-10">
        <div className="text-12 text-primary-500 mb-5">
          {column.title === 'input' ? 'Source Token' : 'Destination Token '}
        </div>

        <div className="flex items-center">
          <div className="relative">
            <img
              src={logo}
              className="rounded-full"
              alt={name || symbol}
              width={18}
              height={18}
            />
            <img
              src={blockchainLogo}
              width={10}
              height={10}
              alt={blockchain}
              className="absolute rounded-full right-[-2px] bottom-[-2px]"
            />
          </div>
          <div className="flex items-center px-5 text-14 text-primary-500">
            {symbol || name}
          </div>
          <div className="text-neutral-400 text-12">{blockchain}</div>
        </div>
      </div>
    </div>
  );
}

export default SwapDetailMobileToken;
