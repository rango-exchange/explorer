import SearchBox from 'components/common/SearchBox';
import { Metadata } from 'next';
import { getSummary } from 'services';
import Summary from './_components/Summary';
import ChartBox from './_components/ChartBox';
import RecentSwaps from './_components/RecentSwaps';

export const metadata: Metadata = {
  title: 'Rango Exchange Explorer',
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
      <RecentSwaps />
    </div>
  );
}
