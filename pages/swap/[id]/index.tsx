import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Link from 'next/link';
import SwapSteps from 'components/detail/SwapSteps';
import { DetailsType } from 'types';
import Layout from 'components/common/Layout';
import SearchBox from 'components/common/SearchBox';
import SwapDetailSummary from 'components/detail/SwapDetailSummary';
import { getTxDetails } from 'services';

interface PropsType {
  details: DetailsType;
  status: number;
}

function SwapDetails(props: PropsType) {
  const { details, status } = props;
  const router = useRouter();
  const id = router.query.id as string;

  return status ? (
    <Error statusCode={status} />
  ) : (
    <Layout title={`Swap ${id}`}>
      <div>
        <div className="w-full flex flex-col items-center relative bg-baseBackground">
          <SearchBox />
        </div>
        <div className="w-full bg-neutral-300 flex justify-center">
          <div className="container py-50">
            <div className="w-full py-20 flex items-center justify-start">
              <Link className="text-neutral-800 text-16" href="/">
                Home
              </Link>
              <span className="px-5"> {'>'} </span>
              <span className="text-16 text-primary-500">Swap Details</span>
            </div>

            <SwapDetailSummary id={id} details={details} />
            <SwapSteps steps={details.steps} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async ({
  query,
}) => {
  const { id } = query;
  const details = await getTxDetails(id as string);
  return {
    props: {
      details,
      status: details?.error ? details?.status : 0,
    },
  };
};
export default SwapDetails;
