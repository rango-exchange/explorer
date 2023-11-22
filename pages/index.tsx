import { makeColumns } from '../components/Table/MakeColumns';
import SearchBox from '../components/SearchBox';
import Table from '../components/Table';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { getLastSwaps, getSummary } from '../services';
import { SummaryType, SwapType } from '../types';
import Error from 'next/error';
import Layout from 'components/Layout';
import Summary from 'components/Summary';
import ChartBox from 'components/ChartBox';
import RefreshIcon from 'public/icons/refresh.svg';
import Image from 'next/image';

interface PropsType {
  swaps: SwapType[];
  summary: SummaryType;
  status: number;
}

function Home(props: PropsType) {
  const { swaps, summary, status } = props;
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
    <Layout title="Rango Scanner">
      <div>
        <div className="flex flex-col items-center relative bg-baseBackground h-[632px]">
          <div className="container flex flex-col items-center py-[100px]">
            <h1 className="w-full text-56 text-center text-baseForeground ">
              Rango Swaps Explorer
            </h1>
            <p className="w-full text-22 mb-[45px] text-neutral-200 text-center">
              Track all transactions on Rango Exchange
            </p>
            <SearchBox />
          </div>

          <div className="container bg-neutral-500 absolute p-[40px] flex items-center justify-between bottom-0 translate-y-[50%]">
            <div className="w-[36%]">
              <Summary summary={summary} />
            </div>
            <div className="w-[51%]">
              <ChartBox data={summary.dailyInterval} />
            </div>
          </div>
        </div>
        <div className="bg-neutral-300 pt-[14.68rem] flex justify-center">
          <div className="container mt-[3.125rem] rounded-normal bg-baseForeground p-35">
            <div className="flex flex-col">
              <div className="flex justify-between mb-25 items-start">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-28 font-semibold text-primary-500">
                    Recent Swaps
                  </h2>
                  <p className="text-16 text-neutral-800">
                    Latest 25 swaps on Rango
                  </p>
                </div>
                <div className="flex items-center pt-10">
                  <Image
                    className="pr-5"
                    src={RefreshIcon}
                    alt="icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-14 text-neutral-900">
                    Refresh in {second} seconds
                  </span>
                </div>
              </div>
              <div>
                <Table
                  makeColumns={makeColumns}
                  data={lastSwaps}
                  onClick={handleSwapDetails}
                />
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
