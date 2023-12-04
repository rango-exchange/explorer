import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSearchResult, getWalletSwaps } from '../services';
import { MATCH_TYPE } from '../constant';
import useSWR from 'swr';
import Error from 'next/error';
import Layout from 'components/common/Layout';
import Loading from 'components/common/Loading';
import SearchBox from 'components/common/SearchBox';
import Result from 'components/search/Result';
import NotFound from 'components/search/NotFound';
interface PropsType {
  status?: number;
}
function Search(props: PropsType) {
  const { status } = props;
  const router = useRouter();
  const { query } = router.query;
  const { data } = useSWR(query, getWalletSwaps);

  return status || (data && data.error && data.status) ? (
    <Error statusCode={data?.status || status} />
  ) : (
    <Layout title={`Address ${query as string}`}>
      <div>
        <div className="w-full flex flex-col items-center relative bg-baseBackground">
          <SearchBox />
        </div>
        <div className="w-full bg-neutral-300 flex justify-center">
          {data && (
            <>
              {data.transactions && data.transactions.length ? (
                <Result data={data.transactions} query={query as string} />
              ) : (
                <NotFound query={query as string} />
              )}
            </>
          )}
          {!data && (
            <div className="flex items-center justify-center mt-60">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.query;

  const result = await getSearchResult(query as string);
  if (result?.error) return { props: { status: result.status } };
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
export default Search;
