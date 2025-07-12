import React, { useEffect, useMemo, useState } from 'react';
import { FilterBarChart, PropsType } from './ChartBarBox.type';
import { numberWithCommas } from 'src/utils/amountConverter';
import { SelectBlockchain } from 'src/components/common/SelectBlockchain';
import {
  BreakDownList,
  DailySummaryOption,
  DailySummaryType,
  StatisticDaysFilter,
} from 'src/types';
import { getDailySummary } from 'src/services';
import { Select } from 'src/components/common/Select';
import { OptionType } from 'src/components/common/Select/Select.types';
import {
  ActiveFilterIcon,
  FilterIcon,
  LoadingIcon,
} from 'src/components/icons';
import ModalFilter from './ModalFilter';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import {
  DEFAULT_STATISTIC_BREAK_DOWN_FILTER,
  DEFAULT_STATISTIC_DAYS,
} from 'src/constant';
import { BarChart, prepareBarChartData } from '@rango-dev/charts';
import { barChartColors } from './ChartBarBox.helper';

function ChartBarBox(props: PropsType) {
  const {
    days,
    type,
    dailySummary,
    blockchains,
    title,
    description,
    className = '',
  } = props;
  const isTransactionType = type === 'Transaction';
  const [filter, setFilter] = useState<FilterBarChart>({
    source: '',
    destination: '',
    breakDownBy: DEFAULT_STATISTIC_BREAK_DOWN_FILTER,
  });
  const [dailyData, setDailyData] = useState<DailySummaryType[]>(dailySummary);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [currentDays, setCurrentDays] = useState<StatisticDaysFilter>(
    DEFAULT_STATISTIC_DAYS,
  );

  const { source, destination, breakDownBy } = filter;

  const totalValue =
    dailyData &&
    dailyData
      .map((dailyItem) =>
        isTransactionType ? dailyItem.count : dailyItem.volume,
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const breakDownOptions: OptionType[] = Object.keys(BreakDownList).map(
    (breakItem) => {
      return {
        value: BreakDownList[breakItem as keyof typeof BreakDownList],
        label: breakItem,
      };
    },
  );

  const hasFilter =
    source ||
    destination ||
    breakDownBy !== DEFAULT_STATISTIC_BREAK_DOWN_FILTER;

  async function fetchDailySummaryData() {
    const dailySummaryOption: DailySummaryOption = {
      days: currentDays,
      breakDownBy: breakDownBy as BreakDownList,
    };
    if (source) dailySummaryOption.source = source;
    if (destination) dailySummaryOption.destination = destination;

    const result = await getDailySummary(dailySummaryOption);
    setDailyData(result);
  }

  useEffect(() => {
    setLoading(true);
    setCurrentDays(days);
  }, [days]);

  useEffect(() => {
    fetchDailySummaryData();
  }, [currentDays]);

  useEffect(() => {
    setLoading(true);
    fetchDailySummaryData();
  }, [filter]);

  const handleApplyFilter = (newFilter: FilterBarChart) => {
    setFilter({ ...newFilter });
    setShowFilterModal(false);
  };

  const isStackBar: boolean = !(
    breakDownBy === BreakDownList.None ||
    (!!source && breakDownBy === BreakDownList['Source chain']) ||
    (!!destination && breakDownBy === BreakDownList['Destination chain'])
  );
  const barChartColor = isTransactionType ? ['#469BF5'] : ['#8B62FF'];

  const { chartData, colorBucketMap, buckets } = useMemo(() => {
    const result = prepareBarChartData({
      dailyData: dailyData.map((item) => ({
        date: item.date,
        bucket: item.bucket,
        value: isTransactionType ? item.count : item.volume,
      })),
      label: type,
      barChartColors: isStackBar ? barChartColors : barChartColor,
    });
    setLoading(false);
    return result;
  }, [type, dailyData, isStackBar]);

  return (
    <div
      className={`w-full bg-baseForeground px-0 py-20 md:p-35 rounded-normal ${className}`}>
      <div className="w-full px-20 md:px-0 flex justify-between items-start">
        <div className="w-full">
          <div className="flex w-full md:w-auto md:h-[48px] items-center justify-between md:start text-18 md:text-32 font-medium md:font-semibold text-primary-500">
            <div className="flex items-center">
              <span>
                {!isTransactionType && '$'}
                {numberWithCommas(Math.ceil(totalValue))}
              </span>
              {loading && (
                <LoadingIcon
                  size="1.5rem"
                  className="text-secondary-500 animate-spin ml-10"
                />
              )}
            </div>

            <button
              className="md:hidden"
              type="button"
              onClick={() => setShowFilterModal(true)}>
              {hasFilter ? (
                <div className="relative">
                  <ActiveFilterIcon className="md:hidden primary-600" />
                  <span className="absolute top-[-2px] right-[-1px] rounded-full w-[7px] h-[7px] bg-secondary-500"></span>
                </div>
              ) : (
                <FilterIcon
                  size="1.5rem"
                  className="md:hidden text-neutral-400"
                />
              )}
            </button>
          </div>
          <div className="flex items-center mt-10">
            <span className="text-12 md:text-18 text-primary-500">{title}</span>
            <span className="font-semibold text-primary-500 mx-5">|</span>
            <span className="text-10 md:text-16 text-neutral-800">
              {description}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <div className="flex flex-col justify-center ml-10">
            <div className="text-10 mb-5 text-neutral-800 px-10">
              Source chain
            </div>
            <SelectBlockchain
              label="Select Chain"
              options={blockchains}
              selected={source}
              onSelect={(selectedSource) =>
                setFilter((prev) => ({ ...prev, source: selectedSource }))
              }
            />
          </div>
          <div className="flex flex-col ml-10">
            <div className="text-10 mb-5 text-neutral-800 px-10">
              Destination chain
            </div>
            <SelectBlockchain
              label="Select Chain"
              options={blockchains}
              selected={destination}
              onSelect={(selectedDestination) =>
                setFilter((prev) => ({
                  ...prev,
                  destination: selectedDestination,
                }))
              }
            />
          </div>

          <div className="flex flex-col ml-10">
            <div className="text-10 mb-5 text-neutral-800 px-10">
              Break down by
            </div>
            <Select
              label="select"
              selected={breakDownBy}
              options={breakDownOptions}
              onSelect={(selectedBreakDownBy) =>
                setFilter((prev) => ({
                  ...prev,
                  breakDownBy: selectedBreakDownBy,
                }))
              }
            />
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row w-full  md:h-[475px] md:pt-12 ">
        {isStackBar && (
          <>
            <div className="w-full px-20  md:pr-30 md:pl-0 h-[230px] md:h-[475px]">
              {!loading && chartData?.length && (
                <ParentSize>
                  {({ width, height }) => (
                    <BarChart
                      width={width}
                      height={height}
                      data={chartData}
                      buckets={buckets}
                      colorBucketMap={colorBucketMap}
                      getLabel={(value) =>
                        !isTransactionType ? `$${value}` : value
                      }
                    />
                  )}
                </ParentSize>
              )}
            </div>
            <div className="w-full rounded-normal px-20 md:w-[250px] grid grid-cols-3 md:block h-[140px] md:h-[475px] md:bg-surfacesBackground">
              {!loading &&
                chartData?.length &&
                Array.from(colorBucketMap).map((mapItem, index) => {
                  const [blockchainItem, blockchainColor] = mapItem;
                  return (
                    <React.Fragment key={blockchainItem}>
                      <div className="flex items-center justify-start py-10">
                        <span
                          style={{ backgroundColor: blockchainColor }}
                          className={`w-[10px] h-[10px] rounded-full mr-5`}></span>
                        <span className="text-10 font-medium md:font-normal md:text-14">
                          {blockchainItem}
                        </span>
                      </div>

                      {index !== colorBucketMap.size - 1 && (
                        <div className="h-[1px] hidden md:block w-full bg-neutral-300"></div>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
          </>
        )}

        {!isStackBar && (
          <div className="w-full px-20 md:px-0 md:pt-12 h-[230px] md:h-[475px]">
            {!loading && chartData?.length && (
              <ParentSize>
                {({ width, height }) => (
                  <BarChart
                    width={width}
                    height={height}
                    data={chartData}
                    buckets={buckets}
                    colorBucketMap={colorBucketMap}
                    getLabel={(value) =>
                      !isTransactionType ? `$ ${value}` : value
                    }
                  />
                )}
              </ParentSize>
            )}
          </div>
        )}
      </div>

      <ModalFilter
        onClose={() => {
          setShowFilterModal(false);
        }}
        onApply={handleApplyFilter}
        open={showFilterModal}
        blockchains={blockchains}
        selectedFilter={filter}
      />
    </div>
  );
}

export default ChartBarBox;
