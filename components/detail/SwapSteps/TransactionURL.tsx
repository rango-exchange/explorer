import React from 'react';
import IconStatus from 'components/common/IconStatus';
import { TransactionURLProps } from './SwapSteps.type';
import { SwapStatus } from 'types';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';
import { LinkIcon } from 'components/icons';
import TransactionURLMobileItem from './TransactionURLMobileItem';

function TransactionURL(props: TransactionURLProps) {
  const { explorerUrls, status } = props;
  const handleLink = (value: string) => {
    if (value) window.open(value, '_blank');
  };

  return (
    <>
      {explorerUrls.map((exploreItem, index) => {
        const { url, description } = exploreItem;
        const overridedDescription = description + ' Transaction';
        const transactionStatus: SwapStatus =
          index === explorerUrls.length - 1 ? status : 'success';
        return (
          <>
            <TransactionURLMobileItem
              key={url}
              description={overridedDescription}
              transactionStatus={transactionStatus}
              url={url}
            />
            <div
              key={`transaction-${index}`}
              className="mb-10 bg-neutral-900 px-10 py-12 rounded-micro hidden md:flex items-center justify-between">
              <div className="flex items-center">
                <IconStatus status={transactionStatus} />
                <span className="pl-5 text-14 text-primary-500">
                  {overridedDescription || 'Swap transaction'}
                </span>
              </div>
              <div className="flex items-center">
                <ButtonCopyIcon
                  className="mr-5"
                  hasTooltip={false}
                  text={url}
                />
                <button onClick={() => handleLink(url)}>
                  <LinkIcon className="text-neutral-400 hover:text-hoverIcon" />
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default TransactionURL;
