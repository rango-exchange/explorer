import { useMemo } from 'react';
import { TableProps, OldColumnType } from './Table.type';
import TableHead from './TableHead';

function Table(props: TableProps) {
  const { makeColumns, data, onClick } = props;

  const columns: OldColumnType[] = useMemo(
    () => makeColumns({ onClick }),
    [makeColumns, onClick],
  );

  return (
    <div className="w-full">
      <div className="hidden lg:flex lg:text-center">
        <TableHead />
      </div>
      {data.map((item, key) => {
        console.log('old item', item, key);
        return (
          <div
            key={`row-${key}`}
            className="rounded-xl bg-neutral-100 w-full grid grid-cols-1 mb-4 px-2 lg:mb-0 lg:px-0 lg:flex lg:items-center lg:justify-center lg:border-b lg:!border-primary lg:border-opacity-50 lg:rounded-none">
            {columns.map((row) => (
              <div
                className={`text-16 flex items-center justify-between font-semibold lg:flex-1 lg:font-normal lg:text-base lg:text-center !py-5 lg:block ${
                  row.classNameColBody || ''
                }`}
                key={`td-${row.key}`}>
                {!row.hiddenTitle && (
                  <div className="block lg:hidden font-normal text-neutral-900">
                    {row.title}
                  </div>
                )}

                {/* {row.render
                  ? row.render(item[row.key], item, key)
                  : item[row.key]} */}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Table;
