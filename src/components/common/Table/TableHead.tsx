import { columns } from './Table.helper';

function TableHead() {
  return (
    <div className="w-full hidden md:grid  md:grid-cols-11  bg-surfacesBackground">
      {columns.map((col, index) => (
        <div
          className={`text-14 font-medium px-15 lg:px-20 py-20 lg:py-30 text-primary-500 col-span-${
            index === 0 ? 3 : 2
          }`}
          key={`head-${col.id}`}>
          {col.title}
        </div>
      ))}
    </div>
  );
}

export default TableHead;
