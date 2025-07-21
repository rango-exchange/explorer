import SearchBox from 'src/components/common/SearchBox';
import { Metadata } from 'next';
import { getSummary } from 'src/services';
import Summary from './_components/Summary';
import ChartBox from './_components/ChartBox';
import RecentSwaps from './_components/RecentSwaps';
import TableLoading from 'src/components/common/Table/TableLoading';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Track all transactions on Rango Exchange',
};

export default async function HomePage() {
  const summary = await getSummary();

  return (
    <div>
      <div className="flex flex-col items-center relative bg-baseBackground h-[595px] md:h-[662px]">
        <SearchBox />
        <div className="w-[calc(100%-3.125rem)] md:container bg-neutral-500 absolute p-20 md:p-[40px] pr-0 md:pr-0 flex flex-col-reverse  md:flex-row  justify-between bottom-0 rounded-normal translate-y-[50%]">
          <div className="w-full md:w-[36%]">
            <Summary summary={summary} />
          </div>
          <div className="w-full h-full md:w-[64%]">
            <ChartBox data={summary.dailyInterval} />
          </div>
        </div>
      </div>
      <div className="pt-[17.68rem] md:pt-[14.68rem] flex justify-center">
        <Suspense fallback={<TableLoading title="Recent Swaps" />}>
          <RecentSwaps />
        </Suspense>
      </div>
    </div>
  );
}
