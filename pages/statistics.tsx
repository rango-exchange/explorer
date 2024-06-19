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
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  LoadingIcon,
} from 'components/icons';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_STATISTIC_DAYS } from 'constant';
import TopList from 'components/statistics/TopList';
import ChartBarBox from 'components/statistics/ChartBarBox';
import SankeyChartBox from 'components/statistics/SankeyChartBox';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import ModalDatePicker from 'components/common/ModalDatePicker';
import PopoverDatePicker from 'components/common/PopoverDatePicker';
import { useMainContext } from 'hooks/MainContext';
import {
  getEndOfDayUTCTimestamp,
  getStartOfDayUTCTimestamp,
} from 'utils/common';

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
  const { isMobile } = useMainContext();
  const [topListSummary, setTopListSummary] = useState<TopListSummaryType>(
    initialTopListSummary,
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const [hasDateHoverStyle, setHasDateHoverStyle] = useState<boolean>(false);

  const [currentDays, setCurrentDays] = useState<StatisticDaysFilter>(
    DEFAULT_STATISTIC_DAYS,
  );

  const handleSelectDatePicker = (newRange: DateRange | undefined) => {
    setShowDatePicker(false);
    setDateRange(newRange);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutsideDatePicker(event: any) {
      if (!isMobile && ref?.current && !ref.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideDatePicker);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDatePicker);
    };
  }, [ref, isMobile]);

  async function fetchTopListSummary(fromDate?: number, toDate?: number) {
    const result = await getTopListSummary({
      days: currentDays,
      from: fromDate || 0,
      to: toDate || 0,
    });
    if (!result.hasError) {
      setTopListSummary(result);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);

    if (dateRange?.from && dateRange.to) {
      fetchTopListSummary(
        getStartOfDayUTCTimestamp(dateRange.from),
        getEndOfDayUTCTimestamp(dateRange.to),
      );
    } else {
      fetchTopListSummary();
    }

    setHasDateHoverStyle(false);
  }, [dateRange]);

  useEffect(() => {
    setLoading(true);
    setDateRange({ from: undefined, to: undefined });
    setHasDateHoverStyle(false);
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

  if (blockchains && !status) {
    blockchains.forEach((blockchainItem) => {
      blockchainDataMap.set(blockchainItem.name, blockchainItem);
    });
  }

  const handleRemoveDateRange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setDateRange({ from: undefined, to: undefined });
    setHasDateHoverStyle(false);
  };

  return status ? (
    <Error />
  ) : (
    <Layout hasSearchInput title="Statistics">
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
            <div className="w-full md:w-auto flex items-center flex-col md:flex-row">
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
              <div ref={ref} className="relative w-full md:w-auto">
                <button
                  onClick={() => setShowDatePicker((prev) => !prev)}
                  className={`flex items-center w-full md:w-[260px] h-[40px] justify-between mt-10 md:mt-0 md:ml-10 group/box bg-surfacesBackground hover:bg-hoverBackground px-10 py-5 rounded-soft ${
                    hasDateHoverStyle && dateRange?.from && dateRange.to
                      ? '!bg-surfacesBackground'
                      : ''
                  } `}>
                  {dateRange?.from && dateRange.to ? (
                    <>
                      {/* Apr 11, 2023 - Apr 17, 2023 */}
                      <div
                        className={`text-14 group-date text-primary-500 ${
                          hasDateHoverStyle ? '!text-hoverIcon' : ''
                        }`}>
                        {`${format(dateRange.from, 'MMM dd, yyy')} - ${format(
                          dateRange.to,
                          'MMM dd, yyy',
                        )}`}
                      </div>
                      <div className="flex items-center">
                        <button
                          onMouseEnter={() => setHasDateHoverStyle(true)}
                          onMouseLeave={() => setHasDateHoverStyle(false)}
                          type="button"
                          onClick={handleRemoveDateRange}>
                          <CloseIcon
                            className="text-neutral-400 hover:text-hoverIcon"
                            size="9px"
                          />
                        </button>
                        <span className="text-neutral-400 mx-10">|</span>
                        <ChevronDownIcon
                          size="12px"
                          className={`group-hover/box:text-hoverIcon text-primary-500 ${
                            hasDateHoverStyle ? '!text-primary-500' : ''
                          }`}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-14 text-primary-500">
                        Custom Period
                      </span>
                      <ChevronDownIcon
                        size="12px"
                        className="group-hover/box:text-hoverIcon text-primary-500"
                      />
                    </>
                  )}
                </button>
                {showDatePicker && !isMobile && (
                  <PopoverDatePicker
                    onApply={handleSelectDatePicker}
                    selectedRange={dateRange}
                  />
                )}
              </div>
            </div>
          </div>

          <ChartBarBox
            days={currentDays}
            dateRange={dateRange}
            blockchains={blockchains}
            type="transaction"
            dailySummary={dailySummary}
            title="Transaction"
            description="Number of transactions by day"
            className="mb-10 md:mb-15"
          />
          <ChartBarBox
            type="volume"
            blockchains={blockchains}
            dateRange={dateRange}
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

          <ModalDatePicker
            open={isMobile && showDatePicker}
            onClose={() => setShowDatePicker(false)}
            selectedRange={dateRange}
            onApply={setDateRange}
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
  const topListSummary = await getTopListSummary({
    days: DEFAULT_STATISTIC_DAYS,
  });

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
