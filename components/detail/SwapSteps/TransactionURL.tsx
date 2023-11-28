import React from 'react';
import IconStatus from 'components/common/IconStatus';
import { TransactionURLProps } from './SwapSteps.type';
import { SwapStatus } from 'types';
import LinkIcon from 'public/icons/link.svg';
import CopyIcon from 'public/icons/copy.svg';
import Image from 'next/image';
import { CopyText } from 'utils/copyText';

function TransactionURL(props: TransactionURLProps) {
  const { explorerUrls, status } = props;

  const handleLink = (value: string) => {
    if (value) window.open(value, '_blank');
  };

  const handleCopy = (value: string) => {
    if (value) CopyText(value);
  };

  return (
    <>
      {explorerUrls.map((exploreItem, index) => {
        const { description, url } = exploreItem;
        const transactionStatus: SwapStatus =
          index === explorerUrls.length - 1 ? status : 'success';
        return (
          <div
            key={`transaction-${index}`}
            className="mb-10 bg-neutral-900 px-10 py-12 rounded-micro flex items-center justify-between">
            <div className="flex items-center">
              <IconStatus status={transactionStatus} />
              <span className="pl-5 text-14 text-primary-500">
                {description || 'Swap transaction'}
              </span>
            </div>
            <div className="flex items-center">
              <button className="mr-5" onClick={() => handleCopy(url)}>
                <Image
                  src={CopyIcon}
                  height={16}
                  width={16}
                  alt="copy transaction"
                />
              </button>
              <button onClick={() => handleLink(url)}>
                <Image
                  src={LinkIcon}
                  height={16}
                  width={16}
                  alt="transaction link"
                />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TransactionURL;
