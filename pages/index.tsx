import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getLastSwaps, getSummary } from '../services';
import { SummaryType, SwapType } from '../types';
import Error from 'next/error';
import ChartBox from 'components/home/ChartBox';
import Layout from 'components/common/Layout';
import SearchBox from 'components/common/SearchBox';
import Summary from 'components/home/Summary';
import { RefreshIcon } from 'components/icons';
import Table from 'components/common/Table';

interface PropsType {
  swaps: SwapType[];
  summary: SummaryType;
  status: number;
}

function Home(props: PropsType) {
  const { swaps, summary, status } = props;
  const [lastSwaps, setLastSwaps] = useState<SwapType[]>([]);
  const [second, setSecond] = useState(30);

  useEffect(() => {
    const interval = setInterval(async () => {
      let sec = second - 1;
      if (sec === 0) {
        const swaps = await getLastSwaps();
        if (Array.isArray(swaps)) setLastSwaps(swaps);
        sec = 30;
      }
      setSecond(sec);
    }, 1000);

    return () => clearInterval(interval);
  }, [second]);
  useEffect(() => setLastSwaps(swaps), []);

  return status ? (
    <Error statusCode={status} />
  ) : (
    <Layout title="Rango Scanner">
      <div>
        <div className="flex flex-col items-center relative bg-baseBackground h-[595px] md:h-[662px]">
          <SearchBox />
          <div className="w-[calc(100%-3.125rem)] md:container bg-neutral-500 absolute p-20 md:p-[40px] pr-0 md:pr-0 flex flex-col-reverse  md:flex-row items-center justify-between bottom-0 rounded-normal translate-y-[50%]">
            <div className="w-full md:w-[36%]">
              <Summary summary={summary} />
            </div>
            <div className="w-full md:w-[64%]">
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
                  <RefreshIcon className="pr-5 text-neutral-400" />
                  <span className="text-10 md:text-14 text-neutral-400">
                    Refresh in {second} seconds
                  </span>
                </div>
              </div>
              <div>
                <Table data={lastSwaps} />
              </div>
            </div>
          </div>
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
      swaps,
      summary,
      status:
        swaps?.error || summary?.error ? swaps?.status || summary?.status : 0,
    },
  };
};

export default Home;
