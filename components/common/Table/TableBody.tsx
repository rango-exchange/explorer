/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TableBodyProps } from './Table.type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { columns } from './Table.helper';
import Link from 'next/link';

dayjs.extend(utc);

function TableBody(props: TableBodyProps) {
  const { data } = props;
  return (
    <div className="w-full">
      {data.map((item) => {
        const { requestId } = item;
        return (
          <div
            key={requestId}
            className="w-full flex flex-col p-15 mt-15 md:mt-0 md:p-0 rounded-micro md:-rounded-none md:grid md:grid-cols-11 bg-surfacesBackground md:bg-transparent md:hover:bg-hoverBackground md:even:bg-surfacesBackground ">
            {columns.map((col) => {
              const CellComponent = col.component;
              return CellComponent ? (
                <CellComponent key={col.id} column={col} swapItem={item} />
              ) : null;
            })}

            <Link
              href={`/swap/${requestId}`}
              className={`w-full md:hidden text-center rounded-micro mt-30 border border-primary-600 py-10 text-primary-600 text-16 font-semibold`}>
              Detail
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default TableBody;
