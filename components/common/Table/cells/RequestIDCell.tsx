import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CellProps } from '../Table.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

dayjs.extend(utc);

function RequestIDCell(props: CellProps) {
  const { swapItem } = props;
  const { requestId, transactionTime } = swapItem;

  const router = useRouter();

  const handleSwapDetails = (id: string) => {
    router.push(`/swap/${id}`);
  };

  return (
    <div className="flex flex-col col-span-3 items-start p-20">
      <div className="flex justify-center items-center mb-5">
        <button
          className="text-16 text-primary-500 mr-5 hover:text-secondary-500"
          onClick={() => handleSwapDetails(requestId)}>
          {`${requestId.slice(0, 8)}...${requestId.slice(
            requestId.length - 8,
            requestId.length,
          )}`}
        </button>
        <ButtonCopyIcon text={requestId} />
      </div>
      <div className="text-14 text-neutral-400">
        {dayjs
          .utc(transactionTime)
          .local()
          .format('DD MMMM YYYY | HH:mm')
          .toString()}
      </div>
    </div>
  );
}

export default RequestIDCell;
