import { useRouter } from 'next/router';
import { getTransactions } from '../services';
import useSWR from 'swr';
import Layout from 'components/common/Layout';
import Result from 'components/transactions/Result';
import NotFound from 'components/search/NotFound';
import TableLoading from 'components/common/Table/TableLoading';
import Error from 'components/common/Error';
import { useState } from 'react';

const FILTER_ITEMS = [
  {
    name: 'all',
    title: 'All',
  },
  {
    name: 'success',
    title: 'Complete',
  },
  {
    name: 'running',
    title: 'Running',
  },
  {
    name: 'failed',
    title: 'Failed',
  },
];
function Transactions() {
  const [status, setStatus] = useState(FILTER_ITEMS[0].name);
  const router = useRouter();
  const { query, page } = router.query;
  const { data } = useSWR([page, status], getTransactions);
  const { transactions, total } = data || {};

  return data && data?.hasError ? (
    <Error />
  ) : (
    <Layout title="Transactions">
      <div>
        <div className="w-full flex justify-center">
          {data && (
            <>
              {transactions && transactions.length ? (
                <Result
                  total={total}
                  filterItems={FILTER_ITEMS}
                  page={Number(page || 0)}
                  data={transactions}
                  query={query as string}
                  status={status}
                  setStatus={setStatus}
                />
              ) : (
                <NotFound query={query as string} />
              )}
            </>
          )}
          {!data && <TableLoading />}
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
