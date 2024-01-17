import { GassIcon } from 'components/icons';
import { CellProps } from '../Table.type';
import { getPercentageChange } from 'utils/amountConverter';

function AmountCell(props: CellProps) {
  const { swapItem, column } = props;
  const { stepsSummary } = swapItem;
  const fromToken = stepsSummary.length ? stepsSummary[0]?.fromToken : null;
  const toToken = stepsSummary.length
    ? stepsSummary[stepsSummary.length - 1]?.toToken
    : null;

  const usdFromAmount = fromToken?.price
    ? fromToken.price * (fromToken.realAmount || fromToken.expectedAmount)
    : null;

  const usdToRealAmount =
    toToken?.price && toToken?.realAmount
      ? toToken.price * toToken.realAmount
      : null;

  const usdToExpectedAmount =
    toToken?.price && toToken?.expectedAmount
      ? toToken.price * toToken.expectedAmount
      : null;

  const realChangePercentage = getPercentageChange(
    usdFromAmount,
    usdToRealAmount,
  );
  const expectedChangePercentage = getPercentageChange(
    usdFromAmount,
    usdToExpectedAmount,
  );
  const gasFee = stepsSummary.reduce((acc, cur) => {
    if (cur?.feeUsd) return acc + cur.feeUsd;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col md:col-span-2 justify-center items-start md:p-15 lg:p-20">
      <div className="md:hidden text-12 mt-10 text-primary-500">
        {column.title}
      </div>
      {(usdToRealAmount || usdToExpectedAmount) && (
        <div
          className={`text-14 md:text-16 md:mb-5 flex items-center ${
            usdToRealAmount ? 'text-primary-500' : 'text-neutral-400'
          }`}>
          <span className="mr-5">
            {usdToRealAmount
              ? `$${usdToRealAmount.toFixed(2)}`
              : `~$${usdToExpectedAmount?.toFixed(2)}`}
          </span>
          <span>
            {usdToRealAmount
              ? `(${realChangePercentage}%)`
              : expectedChangePercentage
                ? `(${expectedChangePercentage}%)`
                : ''}
          </span>
        </div>
      )}
      <div className="text-12 md:text-14 flex items-center">
        <GassIcon className="text-neutral-400" size="0.875rem" />
        <span className="px-5 text-neutral-400">Fee:</span>
        <span className="text-neutral-400">
          {gasFee ? `$${gasFee.toFixed(2)}` : '--'}
        </span>
      </div>
    </div>
  );
}

export default AmountCell;
