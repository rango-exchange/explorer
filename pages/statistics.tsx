import { GetServerSideProps } from 'next';
import {
  getBlockchains,
  getDailySummary,
  getTopListSummary,
} from '../services';
import Layout from 'components/common/Layout';
import Error from 'components/common/Error';
import { BlockchainMeta } from 'types/meta';
import {
  BreakDownList,
  DailySummaryType,
  StatisticDaysFilter,
  TopListSummaryType,
} from 'types';
import Link from 'next/link';
import { ChevronRightIcon, LoadingIcon } from 'components/icons';
import { useEffect, useState } from 'react';
import { DEFAULT_STATISTIC_DAYS } from 'constant';
import TopList from 'components/statistics/TopList';
import ChartBarBox from 'components/statistics/ChartBarBox';
import SankeyChartBox from 'components/statistics/SankeyChartBox';

interface PropsType {
  dailySummary: DailySummaryType[];
  initialTopListSummary: TopListSummaryType;
  blockchains: BlockchainMeta[];
  status: number;
}

const statisticDaysFilter: StatisticDaysFilter[] = [7, 30, 90];

function Statistics(props: PropsType) {
  const { dailySummary, initialTopListSummary, blockchains, status } = props;
  const blockchainDataMap = new Map<string, BlockchainMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [topListSummary, setTopListSummary] = useState<TopListSummaryType>(
    initialTopListSummary,
  );

  const [currentDays, setCurrentDays] = useState<StatisticDaysFilter>(
    DEFAULT_STATISTIC_DAYS,
  );

  useEffect(() => {
    async function fetchTopListSummary() {
      const result = await getTopListSummary(currentDays);
      setTopListSummary(result);
      setLoading(false);
    }
    setLoading(true);
    fetchTopListSummary();
  }, [currentDays]);

  const {
    topDestinationByTxCount,
    topDestinationByVolume,
    topPathsByTxCount,
    topPathsByVolume,
    topSourceByTxCount,
    topSourceByVolume,
  } = topListSummary || {};

  if (blockchains) {
    blockchains.forEach((blockchainItem) => {
      blockchainDataMap.set(blockchainItem.name, blockchainItem);
    });
  }

  return status ? (
    <Error />
  ) : (
    <Layout hasSearchInput title="Statistics">
      <div className="w-full flex justify-center">
        <div className="container px-25 md:px-0 pt-30 md:py-50">
          <div className="w-full py-10 md:py-20 flex items-center justify-between">
            <div className="flex items-center">
              <Link className="text-neutral-800 text-10 md:text-16" href="/">
                Home
              </Link>
              <ChevronRightIcon className="mx-5 text-neutral-800" />
              <span className="text-10 md:text-16 text-primary-500">
                Statistics
              </span>
            </div>
            <div className="flex items-center">
              {loading && (
                <LoadingIcon
                  size="1.5rem"
                  className="text-secondary-500 animate-spin mr-10"
                />
              )}
              <div className="flex items-center bg-baseForeground p-5 rounded-normal">
                {statisticDaysFilter.map((dayItem) => {
                  return (
                    <button
                      key={`day-filter-${dayItem}`}
                      onClick={() => setCurrentDays(dayItem)}
                      className={`text-10 w-[86px] md:w-[90px] md:text-14 rounded-soft px-15 py-5 font-normal	 ${
                        currentDays === dayItem
                          ? 'bg-secondary-500 text-baseForeground'
                          : 'bg-transparent text-neutral-200'
                      }`}>
                      {`${dayItem} Days`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <ChartBarBox
            days={currentDays}
            blockchains={blockchains}
            type="transaction"
            dailySummary={dailySummary}
            title="Transaction"
            description="Number of transactions by day"
            className="mb-15"
          />
          <ChartBarBox
            type="volume"
            blockchains={blockchains}
            days={currentDays}
            dailySummary={dailySummary}
            title="Volume"
            description="Transfer Volume by day"
          />

          <div className="grid grid-cols-3 mt-25 gap-15">
            <TopList
              blockchainDataMap={blockchainDataMap}
              topList={topPathsByTxCount}
              title="Top Paths"
              description="Top chain pairs by transactions"
              type="path"
            />
            <TopList
              blockchainDataMap={blockchainDataMap}
              topList={topSourceByTxCount}
              title="Top Sources"
              description="Top sources by transactions"
              type="blockchain"
            />
            <TopList
              blockchainDataMap={blockchainDataMap}
              topList={topDestinationByTxCount}
              title="Top Destination "
              description="Top destinations by transactions"
              type="blockchain"
            />
            <TopList
              blockchainDataMap={blockchainDataMap}
              topList={topPathsByVolume}
              title="Top Paths"
              description="Top chain pairs by volume"
              type="path"
              isVolume
            />
            <TopList
              blockchainDataMap={blockchainDataMap}
              topList={topSourceByVolume}
              title="Top Sources"
              description="Top sources by volume"
              type="blockchain"
              isVolume
            />
            <TopList
              blockchainDataMap={blockchainDataMap}
              topList={topDestinationByVolume}
              title="Top Destination "
              description="Top destinations by volume"
              type="blockchain"
              isVolume
            />
          </div>

          <SankeyChartBox
            topSourcePath={topPathsByVolume}
            blockchainDataMap={blockchainDataMap}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  const blockchains = await getBlockchains();
  const dailySummary = await getDailySummary({
    days: DEFAULT_STATISTIC_DAYS,
    breakDownBy: BreakDownList.None,
  });
  const topListSummary = await getTopListSummary(DEFAULT_STATISTIC_DAYS);
  return {
    props: {
      blockchains: blockchains.hasError ? {} : blockchains,
      dailySummary: dailySummary.hasError ? {} : dailySummary,
      initialTopListSummary: topListSummary.hasError ? {} : topListSummary,
      status:
        blockchains?.hasError ||
        dailySummary?.hasError ||
        topListSummary?.hasError
          ? 1
          : 0,
    },
  };
};

export default Statistics;
