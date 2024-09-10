import Link from 'next/link';
import { SwapDetailItem } from './SwapDetail.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';
import { SearchIcon } from 'components/icons';
import Image from 'next/image';
import logo from 'public/logo.png';
import Tooltip from 'components/common/Tooltip';

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
        className="text-secondary-500 mr-5 max-w-[80%] text-ellipsis overflow-hidden whitespace-nowrap">
        {wallet?.address || '-'}
      </Link>
      {wallet?.address && (
        <ButtonCopyIcon tooltipText="Copy Address" text={wallet?.address} />
      )}
      {wallet?.address && (
        <Link
          className={`ml-1.5 flex items-center relative`}
          href={`/search?query=${wallet?.address}`}>
          <Tooltip label={'Search wallet transactions'}>
            <Image
              src={logo}
              className="!w-[18px] !h-[18px]"
              alt="Rango logo"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
            <div className="bg-white absolute p-0.5 rounded-full -right-1.5	-bottom-1.5">
              <SearchIcon
                size="0.875rem"
                className="text-neutral-400 hover:text-hoverIcon m-auto"
              />
            </div>
          </Tooltip>
        </Link>
      )}
    </div>
  );
}

export default SwapDetailAddress;
