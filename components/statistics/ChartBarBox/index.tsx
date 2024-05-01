import React, { useEffect, useState } from 'react';
import { BarStack, PropsType } from './ChartBarBox.type';
import { numberWithCommas } from 'utils/amountConverter';
import { SelectBlockchain } from 'components/common/SelectBlockchain';
import { BreakDownList, DailySummaryOption, DailySummaryType } from 'types';
import { getDailySummary } from 'services';
import dynamic from 'next/dynamic';
import { Select } from 'components/common/Select';
import { OptionType } from 'components/common/Select/Select.types';
import { getBarChartData } from './ChartBarBox.helper';
import { LoadingIcon } from 'components/icons';

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

  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [breakDownBy, setBreakDownBy] = useState<string>(BreakDownList.None);
  const [dailyData, setDailyData] = useState<DailySummaryType[]>(dailySummary);
  const [loading, setLoading] = useState<boolean>(false);

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
  }, [source, destination, breakDownBy]);

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
      className={`w-full bg-baseForeground px-15 py-20 md:p-35 rounded-soft md:rounded-normal ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex h-[48px] items-center text-16 md:text-32 font-semibold text-primary-500">
            <div>
              {type === 'volume' && '$'}
              {numberWithCommas(Math.ceil(totalValue))}
            </div>
            {loading && (
              <LoadingIcon
                size="1.5rem"
                className="text-secondary-500 animate-spin ml-10"
              />
            )}
          </div>
          <div className="flex items-center mt-10">
            <span className="text-18 text-primary-500">{title}</span>
            <span className="font-semibold text-primary-500 mx-5">|</span>
            <span className="text-16 text-neutral-800">{description}</span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col justify-center ml-10">
            <div className="text-10 mb-5 text-neutral-800 px-10">
              Source chain
            </div>
            <SelectBlockchain
              label="Select Chain"
              options={blockchains}
              selected={source}
              onSelect={setSource}
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
              onSelect={setDestination}
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
              onSelect={setBreakDownBy}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center w-full h-[300px] md:h-[475px]">
        {isStackBar && !loading && (
          <>
            <div className="w-full h-[300px] md:h-[475px]">
              <BarChart type={type} series={dataSeries} days={days} />
            </div>
            <div className="w-[250px] h-[300px] md:h-[475px] bg-surfacesBackground py-10 px-20">
              {dataSeries.map((dataItem, index) => {
                const { name, color: stackColor } = dataItem;

                return (
                  <React.Fragment key={name}>
                    <div className="flex items-center justify-start py-10">
                      <span
                        style={{ backgroundColor: stackColor }}
                        className={`w-[10px] h-[10px] rounded-full mr-5`}></span>
                      <span className="text-14">{name}</span>
                    </div>
                    {index !== dataSeries.length - 1 && (
                      <div className="h-[1px] w-full bg-neutral-300"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}

        {!isStackBar && !loading && (
          <div className="w-full h-[300px] md:h-[475px]">
            <BarChart type={type} series={dataSeries} days={days} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartBarBox;
