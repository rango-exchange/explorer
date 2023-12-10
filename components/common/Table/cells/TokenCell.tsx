/* eslint-disable @next/next/no-img-element */
import isMobile from 'is-mobile';
import { CellProps } from '../Table.type';

function TokenCell(props: CellProps) {
  const { swapItem, column } = props;
  const { stepsSummary } = swapItem;
  const firstStep = stepsSummary.length ? stepsSummary[0] : null;
  const lastStep = stepsSummary.length
    ? stepsSummary[stepsSummary.length - 1]
    : null;

  const token =
    column.tokenType === 'destination'
      ? lastStep?.toToken
      : firstStep?.fromToken;
  const amount = token?.realAmount ? token.realAmount : token?.expectedAmount;

  const { blockchain, blockchainLogo, logo, name, symbol } = token || {};
  const IsMobile = isMobile();

  return (
    <>
      {IsMobile &&
        (column.tokenType === 'source' ? (
          <div className="mt-10"></div>
        ) : (
          <div className="ml-[0.875rem] h-[10px] border-l border-neutral-400"></div>
        ))}
      <div className="flex md:col-span-2 items-start md:items-center md:p-20">
        <div className="relative mr-10">
          <img
            src={logo}
            alt={name || symbol}
            className="rounded-full"
            width={IsMobile ? 27 : 30}
            height={IsMobile ? 27 : 30}
          />
          <img
            src={blockchainLogo}
            width={IsMobile ? 12 : 15}
            height={IsMobile ? 12 : 15}
            alt={blockchain}
            className="absolute rounded-full right-[-2px] bottom-[-2px] md:right-[-3px] md:bottom-[-3px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-14 leading-14 md:leading-16 md:text-16 flex items-center">
            <span
              className={`mr-5 ${
                column.tokenType === 'source'
                  ? 'text-primary-500'
                  : 'text-neutral-400'
              }`}>
              {`${column.tokenType === 'destination' ? '~' : ''}${parseFloat(
                Number(amount).toFixed(3),
              )}`}
            </span>
            <span
              className={`${
                column.tokenType === 'source'
                  ? 'text-primary-500'
                  : 'text-neutral-400'
              }`}>
              {symbol || name}
            </span>
          </div>
          <div className="text-12 leading-12 md:leading-14 md:text-14 text-neutral-400">
            {blockchain}
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenCell;
