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
  const amount = token?.realAmount ? token.realAmount : token?.expectedAmount;

  const { blockchain, blockchainLogo, logo, name, symbol } = token || {};

  return (
    <div className="flex col-span-2 items-center p-20">
      <div className="relative mr-10">
        <img src={logo} alt={name || symbol} width={30} height={30} />
        <img
          src={blockchainLogo}
          width={15}
          height={15}
          alt={blockchain}
          className="absolute right-[-3px] bottom-[-3px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center">
          <span
            className={`text-16 mr-5 ${
              column.tokenType === 'source'
                ? 'text-primary-500'
                : 'text-neutral-400'
            }`}>
            {`${column.tokenType === 'destination' ? '~' : ''}${parseFloat(
              Number(amount).toFixed(3),
            )}`}
          </span>
          <span
            className={`text-16 ${
              column.tokenType === 'source'
                ? 'text-primary-500'
                : 'text-neutral-400'
            }`}>
            {symbol || name}
          </span>
        </div>
        <div className="text-14 text-neutral-400">{blockchain}</div>
      </div>
    </div>
  );
}

export default TokenCell;
