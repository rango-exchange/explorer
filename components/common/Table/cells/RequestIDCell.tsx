import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CellProps } from '../Table.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';
import Tooltip from 'components/common/Tooltip';
import Link from 'next/link';

dayjs.extend(utc);

function RequestIDCell(props: CellProps) {
  const { swapItem, column } = props;
  const { requestId, transactionTime } = swapItem;

  return (
    <div className="flex flex-col md:col-span-3 items-start md:p-15 lg:p-20">
      <div className="text-12 md:hidden text-primary-500">{column.title}</div>
      <div className="flex justify-center items-center md:mb-5">
        <Tooltip label={requestId}>
          <Link
            href={`/swap/${requestId}`}
            className="text-14 md:text-16 text-primary-500 mr-5 hover:underline hover:text-secondary-500">
            {`${requestId.slice(0, 8)}...${requestId.slice(
              requestId.length - 8,
              requestId.length,
            )}`}
          </Link>
        </Tooltip>
        <ButtonCopyIcon tooltipText="Copy Request ID " text={requestId} />
      </div>
      <div className="text-12 md:text-14 text-neutral-400">
        {dayjs
          .utc(transactionTime)
          .local()
          .format('MMMM D, YYYY | hh:mm:ss A')
          .toString()}
      </div>
    </div>
  );
}

export default RequestIDCell;
