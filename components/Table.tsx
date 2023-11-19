import { useMemo } from 'react';

export interface columns {
  title: string;
  key: string;
  render?: (text: string, item: any, index: number) => JSX.Element | string;
  classNameColBody?: string;
  classNameColHead?: string;
  hiddenTitle?: boolean;
}
export interface makeColumnsTypes {
  onClick: (id: string) => void;
}

interface PropsType {
  makeColumns: ({ onClick }: makeColumnsTypes) => columns[];
  data: any[];
  onClick: (id: string) => void;
}
const Table: React.FC<PropsType> = ({
  makeColumns,
  data,
  onClick,
}: PropsType) => {
  const columns: columns[] = useMemo(
    () => makeColumns({ onClick }),
    [makeColumns, onClick],
  );

  return (
    <div className="lg:px-2 lg:pb-2 lg:rounded-xl overflow-hidden lg:bg-neutral-100">
      <div className="w-full">
        <div className="hidden lg:flex lg:text-center">
          {columns.map((col) => (
            <div
              className={`lg:!py-5 lg:border-b lg:!border-primary lg:border-opacity-50 lg:text-lg lg:flex-1 lg:font-bold ${
                col.classNameColHead || ''
              }`}
              key={`head-${col.key}`}>
              {col.title}
            </div>
          ))}
        </div>
        {data.map((item, key) => (
          <div
            key={`${item.id as number}-row-${key}`}
            className="rounded-xl bg-neutral-100 w-full grid grid-cols-1 mb-4 px-2 lg:mb-0 lg:px-0 lg:flex lg:items-center lg:justify-center lg:border-b lg:!border-primary lg:border-opacity-50 lg:rounded-none">
            {columns.map((row) => (
              <div
                className={`text-sm flex items-center justify-between font-semibold lg:flex-1 lg:font-normal lg:text-base lg:text-center !py-5 lg:block ${
                  row.classNameColBody || ''
                }`}
                key={`td-${row.key}`}>
                {!row.hiddenTitle && (
                  <div className="block lg:hidden font-normal text-neutral-900">
                    {row.title}
                  </div>
                )}

                {row.render
                  ? row.render(item[row.key], item, key)
                  : item[row.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
