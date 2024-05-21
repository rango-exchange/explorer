import React, { useEffect, useState } from 'react';
import { BarStack, FilterBarChart, PropsType } from './ChartBarBox.type';
import { numberWithCommas } from 'utils/amountConverter';
import { SelectBlockchain } from 'components/common/SelectBlockchain';
import { BreakDownList, DailySummaryOption, DailySummaryType } from 'types';
import { getDailySummary } from 'services';
import dynamic from 'next/dynamic';
import { Select } from 'components/common/Select';
import { OptionType } from 'components/common/Select/Select.types';
import { getBarChartData } from './ChartBarBox.helper';
import { ActiveFilterIcon, FilterIcon, LoadingIcon } from 'components/icons';
import ModalFilter from './ModalFilter';

const BarChart = dynamic(() => import('./BarChart'), {
  ssr: false,
});

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

  const [filter, setFilter] = useState<FilterBarChart>({
    source: '',
    destination: '',
    breakDownBy: BreakDownList.None,
  });
  const [dailyData, setDailyData] = useState<DailySummaryType[]>(dailySummary);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const { source, destination, breakDownBy } = filter;

  const totalValue = dailyData
    .map((dailyItem) =>
      type === 'transaction' ? dailyItem.count : dailyItem.volume,
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

  const hasFilter = source || destination || breakDownBy !== BreakDownList.None;

  async function fetchDailySummaryData() {
    const dailySummaryOption: DailySummaryOption = {
      days: days,
      breakDownBy: breakDownBy as BreakDownList,
    };
    if (source) dailySummaryOption.source = source;
    if (destination) dailySummaryOption.destination = destination;

    const result = await getDailySummary(dailySummaryOption);
    setDailyData(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchDailySummaryData();
  }, [days]);

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

  const dataSeries: BarStack[] = getBarChartData({
    dailyData,
    isStackBar,
    type,
  });

  return (
    <div
      className={`w-full bg-baseForeground px-0 py-20 md:p-35 rounded-normal ${className}`}>
      <div className="w-full px-20 md:px-0 flex justify-between items-start">
        <div className="w-full">
          <div className="flex w-full md:w-auto md:h-[48px] items-center justify-between md:start text-18 md:text-32 font-medium md:font-semibold text-primary-500">
            <div className="flex items-center">
              <span>
                {type === 'volume' && '$'}
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

      <div className="flex items-center flex-col md:flex-row w-full md:h-[475px]">
        {isStackBar && !loading && (
          <>
            <div className="w-full h-[230px] md:h-[475px]">
              <BarChart type={type} series={dataSeries} days={days} />
            </div>
            <div className="w-full rounded-normal px-20 md:px-0 md:w-[250px] grid grid-cols-3 md:block md:h-[475px] md:bg-surfacesBackground md:py-10 md:px-20">
              {dataSeries.map((dataItem, index) => {
                const { name, color: stackColor } = dataItem;

                return (
                  <React.Fragment key={name}>
                    <div className="flex items-center justify-start py-10">
                      <span
                        style={{ backgroundColor: stackColor }}
                        className={`w-[10px] h-[10px] rounded-full mr-5`}></span>
                      <span className="text-10 font-medium md:font-normal md:text-14">
                        {name}
                      </span>
                    </div>
                    {index !== dataSeries.length - 1 && (
                      <div className="h-[1px] hidden md:block w-full bg-neutral-300"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}

        {!isStackBar && !loading && (
          <div className="w-full h-[230px] md:h-[475px]">
            <BarChart type={type} series={dataSeries} days={days} />
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
