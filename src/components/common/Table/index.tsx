import { TableProps } from './Table.type';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Table(props: TableProps) {
  const { data } = props;
  return (
    <div className="w-full">
      <TableHead />
      <TableBody data={data} />
    </div>
  );
}

export default Table;
