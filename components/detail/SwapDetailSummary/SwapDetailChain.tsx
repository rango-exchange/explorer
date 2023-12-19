/* eslint-disable @next/next/no-img-element */
import { SwapDetailItem } from './SwapDetail.type';

function SwapDetailChain(props: SwapDetailItem) {
  const { details, column } = props;
  const { from, to } = details;

  const token = column.title === 'Source Token' ? from : to;
  const { blockchain, symbol, blockchainLogo, logo, name } = token;

  return (
    <div className="flex col-span-2 items-center h-[3.75rem] p-18">
      <div className="relative mr-10">
        <img
          src={logo}
          className="rounded-full"
          alt={name || symbol}
          width={30}
          height={30}
        />
        <img
          src={blockchainLogo}
          width={15}
          height={15}
          alt={blockchain}
          className="absolute rounded-full right-[-3px] bottom-[-3px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center text-16 text-primary-500">
          {symbol || name}
        </div>
        <div className="text-neutral-400 text-14">{blockchain}</div>
      </div>
    </div>
  );
}

export default SwapDetailChain;
