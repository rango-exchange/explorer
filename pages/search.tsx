import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSearchResult, getWalletSwaps } from '../services';
import { MATCH_TYPE } from '../constant';
import useSWR from 'swr';
import Layout from 'components/common/Layout';
import Result from 'components/search/Result';
import NotFound from 'components/search/NotFound';
import TableLoading from 'components/common/Table/TableLoading';
import Error from 'components/common/Error';

interface PropsType {
  status?: number;
}
function Search(props: PropsType) {
  const { status } = props;
  const router = useRouter();
  const { query, page } = router.query;
  const { data } = useSWR([query, page], getWalletSwaps);
  const { transactions, total } = data || {};

  return status || (data && data?.hasError) ? (
    <Error />
  ) : (
    <Layout hasSearchInput title={`Address ${query as string}`}>
      <div className="w-full flex justify-center">
        {data && (
          <>
            {transactions && transactions.length ? (
              <Result
                total={total}
                page={Number(page || 0)}
                data={transactions}
                query={query as string}
              />
            ) : (
              <NotFound query={query as string} />
            )}
          </>
        )}
        {!data && <TableLoading />}
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

  if (result?.length && result[0].matchType === MATCH_TYPE.TXHASH) {
    const { requestId } = result[0];
    if (requestId)
      return {
        redirect: {
          permanent: false,
          destination: `/swap/${requestId}`,
        },
      };
  }

  return {
    props: {},
  };
};
export default Search;
