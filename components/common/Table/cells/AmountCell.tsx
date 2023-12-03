import { GassIcon } from 'components/icons';
import { CellProps } from '../Table.type';
import { getPercentageChange } from 'utils/amountConverter';

function AmountCell(props: CellProps) {
  const { swapItem } = props;
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

  return (
    <div className="flex flex-col col-span-2 justify-center items-start p-20 ">
      <div className="text-16 text-neutral-400 mb-5 flex items-center">
        <span className="mr-5">
          {usdToAmount && `~$${usdToAmount.toFixed(2)}`}
        </span>
        <span>{changePercentage ? `(${changePercentage}%)` : ''}</span>
      </div>
      <div className="flex items-center">
        <GassIcon className="text-neutral-400" size="0.875rem" />
        <span className="text-14 px-5 text-neutral-400">Fee</span>
        <span className="text-14 text-neutral-400">{`$${
          gasFee ? gasFee.toFixed(2) : '--'
        }`}</span>
      </div>
    </div>
  );
}

export default AmountCell;
