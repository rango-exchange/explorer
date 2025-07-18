import { PropsType } from './Result.type';
import Pagination from '../Pagination';
import Table from 'src/components/common/Table';
import { getWalletSwaps } from 'src/services';
import { notFound } from 'next/navigation';

async function Result(props: PropsType) {
  const { query, page } = props;
  const data = await getWalletSwaps(query, page);
  const { transactions, total } = data || {};

  if (!data || !transactions?.length) {
    notFound();
  }

  return (
    <div className="w-[calc(100%-3.125rem)] md:container mt-30  md:mt-[3.125rem] rounded-normal bg-baseForeground  px-15 py-20 md:p-35 overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <h2 className="text-14 md:text-28 font-semibold text-primary-500">
            Search Results
          </h2>
          <p className="text-12 md:text-16 text-neutral-800">
            {`Found ${total} Rango swaps for  this wallet address`}
          </p>
        </div>
        <div className="md:mt-25">
          <Table data={transactions} />
        </div>
        <div className="mt-15 md:mt-25">
          <Pagination page={page} total={total} query={query} />
        </div>
      </div>
    </div>
  );
}

export default Result;
