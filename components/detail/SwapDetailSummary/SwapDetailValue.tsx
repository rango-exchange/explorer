import { SecondsTohms } from 'utils/secondsTohms';
import { SwapDetailItem } from './SwapDetail.type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IconStatus from 'components/common/IconStatus';

dayjs.extend(utc);

function SwapDetailValue(props: SwapDetailItem) {
  const { details, column } = props;
  const { srcAmount, dstAmount, to, from, estimatedTimeInSeconds, status } =
    details;

  return (
    <div className="flex col-span-3 items-center p-16 text-16">
      {column.title === 'Swap Status' && (
        <IconStatus hasTitle={true} status={status} />
      )}
      {column.title === 'Input Amount' && (
        <span className="text-primary-500">{`${srcAmount} ${from.symbol}`}</span>
      )}
      {column.title === 'Output Amount' && (
        <span className="text-neutral-400">{`~${dstAmount} ${to.symbol}`}</span>
      )}
      {column.title === 'Duration' && (
        <span className="text-neutral-400">
          {SecondsTohms(estimatedTimeInSeconds)}
        </span>
      )}
      {column.title === 'Initiation Date And Time' && (
        <span className="text-primary-500">
          {dayjs
            .utc(details.creationDate)
            .local()
            .format('DD MMMM YYYY, HH:mm')
            .toString()}
        </span>
      )}
    </div>
  );
}

export default SwapDetailValue;
