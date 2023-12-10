import { TableProps } from './Table.type';
import TableHead from './TableHead';
import TableBody from './TableBody';
import isMobile from 'is-mobile';

function Table(props: TableProps) {
  const { data } = props;
  const IsMobile = isMobile();
  return (
    <div className="w-full">
      {!IsMobile && <TableHead />}
      <TableBody data={data} />
    </div>
  );
}

export default Table;
