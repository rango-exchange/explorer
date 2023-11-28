/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSearchResult, getWalletSwaps } from '../services';
import { MATCH_TYPE } from '../constant';
import useSWR from 'swr';
import Error from 'next/error';
import Image from 'next/image';
import CopyIcon from 'public/img/copy.svg';
import Layout from 'components/common/Layout';
import Table from 'components/home/Table';
import { CopyText } from 'utils/copyText';
import Loading from 'components/common/Loading';
import NotFoundAnything from 'components/notFound/NotFoundAnything';
interface PropsType {
  status?: number;
}
const Home: NextPage<PropsType> = ({ status }: PropsType) => {
  const router = useRouter();
  const { query } = router.query;
  const { data } = useSWR(query, getWalletSwaps);

  return status || (data && data.error && data.status) ? (
    <Error statusCode={data?.status || status} />
  ) : (
    <Layout title={`Address ${query as string}`}>
      <div className="flex items-center text-base text-black truncate font-bold mb-3 lg:text-28 lg:mb-6">
        search results: <span className="font-normal ml-1">{query}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            CopyText(query as string);
          }}
          className="group relative cursor-pointer">
          <Image src={CopyIcon} alt="copy_to_clipboard" />
        </button>
      </div>

      {!data ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : !data.transactions.length ? (
        <NotFoundAnything />
      ) : (
        <Table data={data.transactions} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.query;

  const result = await getSearchResult(query as string);
  if (result?.error) return { props: { status: result.status } };
  if (!result.length) return { notFound: true };
  if (result[0].matchType === MATCH_TYPE.REQUESTID) {
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
export default Home;
