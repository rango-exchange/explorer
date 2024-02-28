import { useRouter } from 'next/router';
import { getTransactions } from '../services';
import useSWR from 'swr';
import Layout from 'components/common/Layout';
import Result from 'components/transactions/Result';
import NotFound from 'components/search/NotFound';
import Error from 'components/common/Error';
import { useEffect, useState } from 'react';
import Loading from 'components/transactions/Loading';

const FILTER_ITEMS = [
  {
    name: 'all',
    title: 'All',
  },
  {
    name: 'success',
    title: 'Success',
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
  const [count, setCount] = useState(0);
  const router = useRouter();
  const { query, page } = router.query;
  const { data } = useSWR([count], () =>
    getTransactions(page as unknown as number, status),
  );
  const { transactions, total } = data || {};

  useEffect(() => {
    if (page === '0') setCount((prev) => prev + 1);
    router.push({
      pathname: router.pathname,
      query: { page: 0 },
    });
  }, [status]);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [page]);

  return data && data?.hasError ? (
    <Error />
  ) : (
    <Layout title="Transactions">
      <div>
        <div className="w-full flex justify-center">
          {data && (
            <>
              {transactions?.length ? (
                <Result
                  total={total}
                  filterItems={FILTER_ITEMS}
                  page={Number(page || 0)}
                  data={transactions}
                  status={status}
                  setStatus={setStatus}
                />
              ) : (
                <NotFound query={query as string} />
              )}
            </>
          )}
          {!data && <Loading />}
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
