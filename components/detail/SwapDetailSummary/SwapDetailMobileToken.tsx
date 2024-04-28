/* eslint-disable @next/next/no-img-element */
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';
import { SwapDetailItem } from './SwapDetail.type';
import Link from 'next/link';
import { DEFAULT_TOKEN_LOGO } from 'constant';
import Image from 'next/image';
import { SearchIcon } from 'components/icons';
import rango from 'public/logo.png';

function SwapDetailMobileToken(props: SwapDetailItem) {
  const { details, column } = props;
  const { steps, sourceWallet, destinationWallet } = details;

  const from = steps?.length ? steps[0].from : null;
  const to = steps?.length ? steps[steps.length - 1].to : null;
  const token = column.title === 'input' ? from : to;
  const { blockchainData, symbol, logo, name, realAmount, expectedAmount } =
    token || {};

  const { shortName: blockchainShortName, logo: blockchainLogo } =
    blockchainData || {};

  const wallet = column.title === 'input' ? sourceWallet : destinationWallet;

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
          <Link
            href={wallet?.explorer}
            target="_blank"
            className="text-14 text-secondary-500 mr-5">
            {wallet?.address.slice(0, 20)}...
          </Link>
          <ButtonCopyIcon text={wallet?.address} />
          <Link
            className={`ml-1.5 flex items-center relative`}
            href={`/search?query=${wallet?.address}`}>
            <Image
              src={rango}
              className="!w-[18px] !h-[18px]"
              alt="Rango logo"
              layout="responsive"
            />
            <div className="bg-white absolute p-0.5 rounded-full -right-1.5	-bottom-1.5">
              <SearchIcon
                size="0.875rem"
                className="text-neutral-400 hover:text-hoverIcon m-auto"
              />
            </div>
          </Link>
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
              src={logo || DEFAULT_TOKEN_LOGO}
              className="rounded-full"
              alt={name || symbol}
              width={18}
              height={18}
            />
            <img
              src={blockchainLogo || DEFAULT_TOKEN_LOGO}
              width={10}
              height={10}
              alt={blockchainShortName}
              className="absolute rounded-full right-[-2px] bottom-[-2px]"
            />
          </div>
          <div className="flex items-center px-5 text-14 text-primary-500">
            {symbol || name}
          </div>
          <div className="text-neutral-400 text-12">{blockchainShortName}</div>
        </div>
      </div>
    </div>
  );
}

export default SwapDetailMobileToken;
