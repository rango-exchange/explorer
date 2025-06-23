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

/*
 *
 * NOTE:
 * The code has been developed with a wrong assumption here which is always the first one is the one we should detect the type of `query` with.
 * If there is more than one result, we should let the user select the one looking for.
 */
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

  // HOTFIX: We priotorize transaction hash. check the note on top of the function.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchedWithTxHash = result?.find((item: any) => {
    return item.matchType === MATCH_TYPE.TXHASH;
  });

  if (matchedWithTxHash) {
    const { requestId } = matchedWithTxHash;
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
