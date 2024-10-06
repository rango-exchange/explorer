import { ChevronRightIcon } from 'components/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTxDetails } from 'services';
import SwapDetailSummary from './_components/SwapDetailSummary';
import SwapSteps from './_components/SwapSteps';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Swap ${params.id}`,
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getTxDetails(params.id);

  if (details.message === 'Transaction not found!') {
    notFound();
  }

  return (
    <div>
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

          <SwapDetailSummary id={params.id} details={details} />
          <SwapSteps steps={details.steps} />
        </div>
      </div>
    </div>
  );
};

export default Page;
