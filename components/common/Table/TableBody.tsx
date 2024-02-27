/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TableBodyProps } from './Table.type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { columns } from './Table.helper';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { SwapType } from 'types';

dayjs.extend(utc);

function TableBody(props: TableBodyProps) {
  const { data } = props;
  const [previousData, setPreviousData] = useState<SwapType[]>([]);

  useEffect(() => {
    return () => {
      setPreviousData(data);
    };
  }, [data]);

  const removedRows = previousData.filter(
    (currentRow) =>
      !data.find(
        (previousRow) => previousRow.requestId === currentRow.requestId,
      ),
  );

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ height: `${20 * 80}px` }}>
      {data.concat(removedRows).map((item, index) => {
        const { requestId } = item;

        const currentIndex = index;
        let previousIndex = previousData.findIndex(
          (row) => row.requestId === requestId,
        );

        if (previousIndex === -1) {
          previousIndex = currentIndex - removedRows.length;
        }
        const dynamicKeyframe = `
        @keyframes dynamicAnimation-${requestId} {
          0% { top: ${previousIndex * 80}px; }
          100% { top: ${currentIndex * 80}px; }
        }
      `;

        const style: React.CSSProperties = {
          position: 'absolute',
          top: `${currentIndex * 80}px`,
        };

        if (previousIndex < 0) {
          style.animation = `dynamicAnimation-${requestId} 2s ease-in-out`;
        } else {
          style.transition = `top 2s ease-in-out`;
        }

        return (
          <div
            key={requestId}
            className={`w-full flex flex-col p-15 mt-15 md:mt-0 md:p-0 rounded-micro md:-rounded-none md:grid md:grid-cols-11 bg-surfacesBackground md:bg-transparent md:hover:bg-hoverBackground md:even:bg-surfacesBackground`}
            style={style}>
            <style>{dynamicKeyframe}</style>
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

export default memo(TableBody);
