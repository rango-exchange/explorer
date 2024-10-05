/* eslint-disable @next/next/no-img-element */
import { DEFAULT_TOKEN_LOGO } from 'constant';
import { SwapDetailItem } from './SwapDetail.type';

function SwapDetailChain(props: SwapDetailItem) {
  const { details, column } = props;
  const { from, to } = details;

  const token = column.title === 'Source Token' ? from : to;
  const { blockchainData, symbol, logo, name } = token;
  const { shortName: blockchainShortName, logo: blockchainLogo } =
    blockchainData;

  return (
    <div className="flex col-span-2 items-center h-[3.75rem] p-18">
      <div className="relative mr-10">
        <img
          src={logo || DEFAULT_TOKEN_LOGO}
          className="rounded-full"
          alt={name || symbol}
          width={30}
          height={30}
        />
        <img
          src={blockchainLogo || DEFAULT_TOKEN_LOGO}
          width={15}
          height={15}
          alt={blockchainShortName}
          className="absolute rounded-full right-[-3px] bottom-[-3px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center text-16 text-primary-500">
          {symbol || name}
        </div>
        <div className="text-neutral-400 text-14">{blockchainShortName}</div>
      </div>
    </div>
  );
}

export default SwapDetailChain;
