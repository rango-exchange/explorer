import Table from 'components/common/Table';
import { PropsType } from './Result.type';
import Pagination from '../Pagination/idnex';

function Result(props: PropsType) {
  const { data, query, total, page } = props;
  return (
    <div className="container mt-[3.125rem] rounded-normal bg-baseForeground p-35">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <h2 className="text-28 font-semibold text-primary-500">
            Search Results
          </h2>
          <p className="text-16 text-neutral-800">
            {`Found ${total} Rango swaps for ${query}`}
          </p>
        </div>
        <div className="mt-25">
          <Table data={data} />
        </div>
        <div className="mt-25">
          <Pagination page={page} total={total} query={query} />
        </div>
      </div>
    </div>
  );
}

export default Result;
