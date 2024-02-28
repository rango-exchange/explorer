import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getLastSwaps, getSummary } from '../services';
import { SummaryType, SwapType } from '../types';
import ChartBox from 'components/home/ChartBox';
import Layout from 'components/common/Layout';
import SearchBox from 'components/common/SearchBox';
import Summary from 'components/home/Summary';
import Table from 'components/common/Table';
import Error from 'components/common/Error';
import RefreshButton from 'components/common/RefreshButton';
import Link from 'next/link';

interface PropsType {
  swaps: SwapType[];
  summary: SummaryType;
  status: number;
}

const REFRESH_TIME = 30;

function Home(props: PropsType) {
  const { swaps, summary, status } = props;
  const [lastSwaps, setLastSwaps] = useState<SwapType[]>([]);
  const [second, setSecond] = useState(REFRESH_TIME);

  const handleRefreshClick = async () => {
    const swaps = await getLastSwaps();
    if (Array.isArray(swaps)) setLastSwaps(swaps);
    setSecond(REFRESH_TIME);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (second > 0) {
        setSecond(second - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [second]);

  useEffect(() => setLastSwaps(swaps), []);

  return status ? (
    <Error />
  ) : (
    <Layout title="Rango Exchange Explorer">
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
          <div className="w-[calc(100%-3.125rem)] md:container mt-30  md:mt-[3.125rem] rounded-normal bg-baseForeground px-15 py-20 md:p-35 overflow-hidden">
            <div className="flex flex-col">
              <div className="flex justify-between  md:mb-25 items-start">
                <div className="flex flex-col justify-center items-start">
                  <h2 className="text-14 md:text-28 font-semibold text-primary-500">
                    Recent Swaps
                  </h2>
                  <p className="text-12 md:text-16 text-neutral-800">
                    Latest 25 swaps on Rango
                  </p>
                </div>
                <div className="flex items-center pt-10">
                  <RefreshButton
                    refreshTime={REFRESH_TIME - 1}
                    onClick={handleRefreshClick}
                  />
                  <span className="text-10 md:text-14 text-neutral-400">
                    Refresh in {second > 9 ? second : `0${second}`} seconds
                  </span>
                </div>
              </div>
              <div>
                <Table data={lastSwaps} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4 text-neutral-400 cursor-pointer">
          <Link href="/transactions">See All Transactions</Link>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  const swaps = await getLastSwaps();
  const summary = await getSummary();
  return {
    props: {
      swaps: swaps.hasError ? {} : swaps,
      summary: summary.hasError ? {} : summary,
      status: swaps?.hasError || summary?.hasError ? 1 : 0,
    },
  };
};

export default Home;
