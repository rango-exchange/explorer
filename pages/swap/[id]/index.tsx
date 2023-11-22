import Layout from '../../../components/Layout';
import TxDetails from '../../../components/TxDetails';
import TxSteps from '../../../components/TxSteps';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getTxDetails } from '../../../services';
import { DetailsType } from '../../../types';
import Error from 'next/error';
import Image from 'next/image';
import copy from '../../../public/img/copy.svg';
import { CopyText } from '../../../utils/copyText';

interface PropsType {
  details: DetailsType;
  status: number;
}

const SwapDetails: NextPage<PropsType> = ({ details, status }: PropsType) => {
  const router = useRouter();
  const id = router.query.id as string;

  return status ? (
    <Error statusCode={status} />
  ) : (
    <Layout pageTitle={`Swap ${id}`}>
      <p className="text-12 font-normal mb-1 lg:mb-3.5 lg:text-28 lg:font-bold">
        Swap From <span className="font-bold">{details.from.symbol}</span> (On{' '}
        {details.from.blockchain}) to{' '}
        <span className="font-bold">{details.to.symbol}</span> (On{' '}
        {details.to.blockchain})
      </p>
      <div className="flex items-center text-12 truncate font-bold lg:text-base mb-6">
        Request ID: <span className="font-normal ml-1">{id}</span>{' '}
        <button
          onClick={(e) => {
            e.stopPropagation();
            CopyText(id);
          }}
          className="group relative cursor-pointer">
          <Image src={copy} alt="copy_to_clipboard" />
        </button>
      </div>
      <div className="lg:mb-11 mb-5">
        <TxDetails details={details} />
      </div>
      <TxSteps steps={details.steps} />
    </Layout>
  );
};

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
