/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TableBodyProps } from './Table.type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { columns } from './Table.helper';

dayjs.extend(utc);

function TableBody(props: TableBodyProps) {
  const { data } = props;

  return (
    <div className="w-full">
      {data.map((item) => {
        const { requestId } = item;
        console.log('swap item', item);
        return (
          <div key={requestId} className="w-full grid grid-cols-11 ">
            {columns.map((col) => {
              const CellComponent = col.component;
              return CellComponent ? (
                <CellComponent key={col.id} column={col} swapItem={item} />
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default TableBody;
