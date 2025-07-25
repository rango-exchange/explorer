'use client';

import { getTopListSummary } from 'src/services';

import { BlockchainMeta } from 'src/types/meta';
import {
  DailySummaryType,
  StatisticDaysFilter,
  TopListSummaryType,
} from 'src/types';
import Link from 'next/link';
import { ChevronRightIcon, LoadingIcon } from 'src/components/icons';
import { useEffect, useState } from 'react';
import { DEFAULT_STATISTIC_DAYS } from 'src/constant';

import TopList from '../TopList';
import ChartBarBox from '../ChartBarBox';
import SankeyChartBox from '../SankeyChartBox';

interface PropsType {
  dailySummary: DailySummaryType[];
  initialTopListSummary: TopListSummaryType;
  blockchains: BlockchainMeta[];
}

const statisticDaysFilter: StatisticDaysFilter[] = [7, 30, 90];

function StatisticsPageContent(props: PropsType) {
  const { dailySummary, initialTopListSummary, blockchains } = props;
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

  blockchains.forEach((blockchainItem) => {
    blockchainDataMap.set(blockchainItem.name, blockchainItem);
  });

  return (
    <div className="w-full flex justify-center">
      <div className="container px-25 md:px-0 pt-30 md:py-50">
        <div className="w-full mb-20 md:0 md:py-10 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="items-center flex mb-5 md:mb-0">
            <Link className="text-neutral-800 text-10 md:text-16" href="/">
              Home
            </Link>
            <ChevronRightIcon className="mx-5 text-neutral-800" />
            <span className="text-10 md:text-16 text-primary-500">
              Statistics
            </span>
          </div>
          <div className="w-full md:w-auto flex items-center">
            {loading && (
              <LoadingIcon
                size="1.5rem"
                className="hidden md:block text-secondary-500 animate-spin mr-10"
              />
            )}
            <div className="w-full md:w-[280px] grid grid-cols-3 md:flex items-center bg-baseForeground p-5 rounded-soft md:rounded-normal">
              {statisticDaysFilter.map((dayItem) => {
                return (
                  <button
                    key={`day-filter-${dayItem}`}
                    onClick={() => setCurrentDays(dayItem)}
                    className={`text-12 md:w-[90px] h-[26px] flex items-center justify-center md:h-auto md:text-14 rounded-soft px-15 py-5 font-normal	 ${
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
          type="Transaction"
          dailySummary={dailySummary}
          title="Transaction"
          description="Number of transactions by day"
          className="mb-10 md:mb-15"
        />
        <ChartBarBox
          type="Volume"
          blockchains={blockchains}
          days={currentDays}
          dailySummary={dailySummary}
          title="Volume"
          description="Transfer Volume by day"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 mt-20 md:mt-25 gap-10 md:gap-15">
          <TopList
            blockchainDataMap={blockchainDataMap}
            topList={topPathsByTxCount}
            title="Top Paths"
            description="By number of transactions"
            type="path"
          />
          <TopList
            blockchainDataMap={blockchainDataMap}
            topList={topSourceByTxCount}
            title="Top Sources"
            description="By number of transactions"
            type="blockchain"
          />
          <TopList
            blockchainDataMap={blockchainDataMap}
            topList={topDestinationByTxCount}
            title="Top Destinations"
            description="By number of transactions"
            type="blockchain"
          />
          <TopList
            blockchainDataMap={blockchainDataMap}
            topList={topPathsByVolume}
            title="Top Paths"
            description="By volume of transactions"
            type="path"
            isVolume
          />
          <TopList
            blockchainDataMap={blockchainDataMap}
            topList={topSourceByVolume}
            title="Top Sources"
            description="By volume of transactions"
            type="blockchain"
            isVolume
          />
          <TopList
            blockchainDataMap={blockchainDataMap}
            topList={topDestinationByVolume}
            title="Top Destinations"
            description="By volume of transactions"
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
  );
}

export default StatisticsPageContent;
