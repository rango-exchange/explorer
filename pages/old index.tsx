import ChartBox from '../components/ChartBox';
import { makeColumns } from '../components/Table/MakeColumns';
// import Navbar from '../components/Navbar';
import SearchBox from '../components/SearchBox';
import Table from '../components/Table';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { getLastSwaps, getSummary } from '../services';
import { SummaryType, SwapType } from '../types';
import Error from 'next/error';

interface PropsType {
  swaps: SwapType[];
  summary: SummaryType;
  status: number;
}

const Home: NextPage<PropsType> = ({ swaps, summary, status }: PropsType) => {
  const [lastSwaps, setLastSwaps] = useState<SwapType[]>([]);
  const [second, setSecond] = useState(30);

  const router = useRouter();

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

  const handleSwapDetails = useCallback((id: string) => {
    router.push(`/swap/${id}`);
  }, []);

  return status ? (
    <Error statusCode={status} />
  ) : (
    <div>
      <Head>
        <title>Rango Scanner</title>
      </Head>
      {/* <Navbar /> */}
      <main>
        <SearchBox />
        <div className="relative">
          <div className="absolute w-full -top-14 md:-top-6 lg:-top-16">
            <ChartBox data={summary.dailyInterval} />
            <div className="mx-4 my-5 lg:mx-16 lg:mt-12">
              <div className="flex mb-2.5 lg:mb-6">
                <h3 className="text-base font-bold lg:text-3xl">
                  Recent Swaps
                </h3>
                <div className="text-primary text-base font-bold ml-3 lg:text-22 self-end">
                  00 : {second < 10 ? `0${second}` : second}
                </div>
              </div>
              <Table
                makeColumns={makeColumns}
                data={lastSwaps}
                onClick={handleSwapDetails}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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
