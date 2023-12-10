import { GassIcon } from 'components/icons';
import { CellProps } from '../Table.type';
import { getPercentageChange } from 'utils/amountConverter';
import isMobile from 'is-mobile';

function AmountCell(props: CellProps) {
  const { swapItem, column } = props;
  const { stepsSummary } = swapItem;
  const fromToken = stepsSummary.length ? stepsSummary[0]?.fromToken : null;
  const toToken = stepsSummary.length
    ? stepsSummary[stepsSummary.length - 1]?.toToken
    : null;

  const usdFromAmount = fromToken?.price
    ? fromToken.price * fromToken.realAmount
    : null;
  const usdToAmount = toToken?.price
    ? toToken.price *
      (toToken.realAmount ? toToken.realAmount : toToken.expectedAmount)
    : null;

  const changePercentage = getPercentageChange(usdFromAmount, usdToAmount);
  const gasFee = stepsSummary.reduce((acc, cur) => {
    if (cur?.feeUsd) return acc + cur.feeUsd;
    return acc;
  }, 0);

  const IsMobile = isMobile();

  return (
    <div className="flex flex-col md:col-span-2 justify-center items-start md:p-20 ">
      {IsMobile && (
        <div className="text-12 mt-10 text-primary-500">{column.title}</div>
      )}
      <div className="text-14 md:text-16 text-neutral-400 md:mb-5 flex items-center">
        <span className="mr-5">
          {usdToAmount && `~$${usdToAmount.toFixed(2)}`}
        </span>
        <span>{changePercentage ? `(${changePercentage}%)` : ''}</span>
      </div>
      <div className="text-12 md:text-14 flex items-center">
        <GassIcon className="text-neutral-400" size="0.875rem" />
        <span className="px-5 text-neutral-400">Fee</span>
        <span className="text-neutral-400">{`$${
          gasFee ? gasFee.toFixed(2) : '--'
        }`}</span>
      </div>
    </div>
  );
}

export default AmountCell;
