import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DetailsType } from 'types';
import Layout from 'components/common/Layout';
import SearchBox from 'components/common/SearchBox';
import { getTxDetails } from 'services';
import { ChevronRightIcon } from 'components/icons';
import SwapDetailSummary from 'components/detail/SwapDetailSummary';
import SwapSteps from 'components/detail/SwapSteps';
import Error from 'components/common/Error';

interface PropsType {
  details: DetailsType;
  status: number;
}

function SwapDetails(props: PropsType) {
  const { details, status } = props;
  const router = useRouter();
  const id = router.query.id as string;

  return status ? (
    <Error />
  ) : (
    <Layout title={`Swap ${id}`}>
      <div>
        <div className="w-full flex flex-col items-center relative bg-baseBackground">
          <SearchBox />
        </div>
        <div className="w-full flex justify-center">
          <div className="container px-25 md:px-0 pt-30 md:py-50">
            <div className="w-full py-10 md:py-20 flex items-center justify-start">
              <Link className="text-neutral-800 text-10 md:text-16" href="/">
                Home
              </Link>
              <ChevronRightIcon className="mx-5 text-neutral-800" />
              <span className="text-10 md:text-16 text-primary-500">
                Swap Details
              </span>
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

  if (details.message === 'Transaction not found!') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      details: details?.hasError ? {} : details,
      status: details?.hasError ? 1 : 0,
    },
  };
};
export default SwapDetails;
