import Table from 'components/common/Table';
import { Dropdown } from 'components/common/Dropdown';
import { PropsType } from './Result.type';
import Pagination from 'components/search/Pagination';

function Result(props: PropsType) {
  const { data, query, total, page, status, setStatus, filterItems } = props;
  return (
    <div className="w-[calc(100%-3.125rem)] md:container mt-30  md:mt-[3.125rem] rounded-normal bg-baseForeground  px-15 py-20 md:p-35 overflow-hidden">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-14 md:text-28 font-semibold text-primary-500">
              Transactions Results
            </h2>
            <p className="text-12 md:text-16 text-neutral-800">
              {`Found ${total} swaps`}
            </p>
          </div>
          <Dropdown
            items={filterItems}
            value={status}
            placeholder="Filter by"
            onChange={setStatus}
          />
        </div>
      </div>
      <div className="md:mt-25">
        <Table data={data} />
      </div>
      <div className="mt-15 md:mt-25">
        <Pagination page={page} total={total} query={query} />
      </div>
    </div>
  );
}

export default Result;
