import { ChevronRightIcon } from 'src/components/icons';
import Link from 'next/link';
import SwapDetailSummary from './_components/SwapDetailSummary';
import SwapSteps from './_components/SwapSteps';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Swap ${params.id}`,
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
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

          <Suspense>
            <SwapDetailSummary id={params.id} />
            <SwapSteps id={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
