/* eslint-disable @next/next/no-img-element */
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

  const { blockchain, blockchainLogo, logo, name, symbol } = token || {};

  return (
    <>
      {column.tokenType === 'source' ? (
        <div className="md:hidden mt-10"></div>
      ) : (
        <div className="md:hidden ml-[0.875rem] h-[10px] border-l border-neutral-400"></div>
      )}
      <div className="flex md:col-span-2 items-start md:items-center md:p-15 lg:p-20">
        <div className="relative mr-10 shrink-0">
          <img
            src={logo}
            alt={name || symbol}
            className="rounded-full w-[27px] md:w-[30px] h-[27px] md:h-[30px]"
          />
          <img
            src={blockchainLogo}
            alt={blockchain}
            className="absolute rounded-full w-[12px] md:w-[15px] h-[12px] md:h-[15px] right-[-2px] bottom-[-2px] md:right-[-3px] md:bottom-[-3px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-14 leading-14 md:leading-16 md:text-16 flex items-center">
            <span
              className={`mr-5 ${
                token?.realAmount ? 'text-primary-500' : 'text-neutral-400'
              }`}>
              {`${!token?.realAmount ? '~' : ''}${parseFloat(
                Number(token?.realAmount || token?.expectedAmount).toFixed(3),
              )}`}
            </span>
            <span
              className={`${
                token?.realAmount ? 'text-primary-500' : 'text-neutral-400'
              }`}>
              {symbol || name}
            </span>
          </div>
          <div className="text-12 leading-12 md:leading-14 md:mt-5 md:text-14 text-neutral-400">
            {blockchain}
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenCell;
