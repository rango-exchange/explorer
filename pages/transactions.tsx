import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSearchResult, getTransactions } from '../services';
import { MATCH_TYPE } from '../constant';
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
    <Layout title={`Address ${query as string}`}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context?.query || {};
  const result = await getSearchResult(query as string);
  if (result?.hasError) return { props: { status: 1 } };
  if (result?.length && result[0].matchType === MATCH_TYPE.REQUESTID) {
    return {
      redirect: {
        permanent: false,
        destination: `/swap/${query as string}`,
      },
    };
  }
  return {
    props: {},
  };
};
export default Transactions;
