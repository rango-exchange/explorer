import React from 'react';
import IconStatus from 'components/common/IconStatus';
import { TransactionURLProps } from './SwapSteps.type';
import { SwapStatus } from 'types';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';
import { LinkIcon } from 'components/icons';
import TransactionURLMobileItem from './TransactionURLMobileItem';
import { CapitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import Tooltip from 'components/common/Tooltip';
import Link from 'next/link';

function TransactionURL(props: TransactionURLProps) {
  const { explorerUrls, status } = props;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      {explorerUrls.map((exploreItem, index) => {
        const { url, description } = exploreItem;
        const overrideDescription = `${
          description ? CapitalizeFirstLetter(description) : 'Swap'
        } Transaction`;
        const transactionStatus: SwapStatus =
          index === explorerUrls.length - 1 ? status : 'success';
        return (
          <>
            <TransactionURLMobileItem
              key={url}
              description={overrideDescription}
              transactionStatus={transactionStatus}
              url={url}
            />
            <div
              key={`transaction-${index}`}
              className="mb-10 bg-neutral-900 px-10 py-12 rounded-micro hidden md:flex items-center justify-between">
              <div className="flex items-center">
                <IconStatus status={transactionStatus} />
                <span className="pl-5 text-14 text-primary-500">
                  {overrideDescription}
                </span>
              </div>
              <div className="flex items-center">
                <ButtonCopyIcon
                  className="mr-5"
                  tooltipText="Copy Transaction"
                  text={url}
                />
                <Tooltip label="View Transaction">
                  <Link href={url} target="_blank" onClick={handleClick}>
                    <LinkIcon className="text-neutral-400 hover:text-hoverIcon" />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default TransactionURL;
