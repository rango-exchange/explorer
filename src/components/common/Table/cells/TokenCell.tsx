/* eslint-disable @next/next/no-img-element */
'use client';

import { DEFAULT_TOKEN_LOGO } from 'src/constant';
import { CellProps } from '../Table.type';
import { InfoIcon } from 'src/components/icons';
import Tooltip from '../../Tooltip';
import { useRef } from 'react';
import useIsTruncated from 'src/hooks/useIsTruncated';

function TokenCell(props: CellProps) {
  const { swapItem, column } = props;
  const { stepsSummary } = swapItem;
  const amountRef = useRef<HTMLSpanElement>(null);
  const tokenNameRef = useRef<HTMLSpanElement>(null);

  const showAmountTooltip = useIsTruncated(amountRef);
  const showTokenNameTooltip = useIsTruncated(tokenNameRef);

  const firstStep = stepsSummary.length ? stepsSummary[0] : null;
  const lastStep = stepsSummary.length
    ? stepsSummary[stepsSummary.length - 1]
    : null;

  const token =
    column.tokenType === 'destination'
      ? lastStep?.toToken
      : firstStep?.fromToken;

  const { blockchainData, logo, name, symbol } = token || {};
  const { shortName: blockchainShortName, logo: blockchainLogo } =
    blockchainData || {};

  const amount = token?.realAmount || token?.expectedAmount;

  const roundedAmount = parseFloat(
    Number(token?.realAmount || token?.expectedAmount).toFixed(3),
  );
  const tokenName = symbol || name;

  return (
    <>
      {column.tokenType === 'source' ? (
        <div className="md:hidden mt-10"></div>
      ) : (
        <div className="md:hidden ml-[0.875rem] h-[10px] border-l border-neutral-400"></div>
      )}
      <div className="flex md:col-span-2 items-start md:max-w-48 md:items-center md:py-15 lg:py-20">
        <div className="relative mr-10 shrink-0">
          <img
            src={logo || DEFAULT_TOKEN_LOGO}
            alt={name || symbol}
            className="rounded-full w-[27px] md:w-[30px] h-[27px] md:h-[30px]"
          />
          <img
            src={blockchainLogo || DEFAULT_TOKEN_LOGO}
            alt={blockchainShortName}
            className="absolute rounded-full w-[12px] md:w-[15px] h-[12px] md:h-[15px] right-[-2px] bottom-[-2px] md:right-[-3px] md:bottom-[-3px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full min-w-0">
          <div className="text-14 leading-14 md:leading-16 md:text-16 flex items-center gap-1 w-full min-w-0">
            <div className="flex items-center gap-0.5 min-w-0">
              <span
                ref={amountRef}
                className={`truncate ${
                  token?.realAmount ? 'text-primary-500' : 'text-neutral-400'
                }`}>
                {`${!token?.realAmount ? '~' : ''}${roundedAmount}`}
              </span>
              {amount && showAmountTooltip && (
                <Tooltip label={amount.toString()}>
                  <InfoIcon color="gray" size="12" />
                </Tooltip>
              )}
            </div>
            <div className="flex items-center gap-0.5 min-w-0">
              <span
                ref={tokenNameRef}
                className={`lg:max-w-14 truncate ${
                  token?.realAmount ? 'text-primary-500' : 'text-neutral-400'
                }`}>
                {tokenName}
              </span>
              {tokenName && showTokenNameTooltip && (
                <Tooltip label={tokenName}>
                  <InfoIcon color="gray" size="12" />
                </Tooltip>
              )}
            </div>
          </div>
          <div className="text-12 leading-12 md:leading-14 md:mt-5 md:text-14 text-neutral-400">
            {blockchainShortName}
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenCell;
