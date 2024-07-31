import { PropsType, ValidDaysFilter } from './Chart.type';
import { useState } from 'react';
import { daysFilter } from './Chart.helper';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('components/home/ChartBox/Chart'), {
  ssr: false,
});

function ChartBox(props: PropsType) {
  const { data } = props;
  const [currentDays, setCurrentDays] = useState<ValidDaysFilter>(7);

  return (
    <div className="md:pl-[60px] h-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pr-20 md:pr-[40px]">
        <div className="flex items-center bg-neutral-700 p-5 rounded-normal">
          {daysFilter.map((filterItem) => {
            return (
              <button
                key={`day-filter-${filterItem.days}`}
                onClick={() => setCurrentDays(filterItem.days)}
                className={`text-10 w-[86px] md:w-[90px] md:text-14 rounded-soft px-15 py-5 md:py-10 font-normal	 ${
                  currentDays === filterItem.days
                    ? 'bg-secondary-500 text-baseForeground'
                    : 'bg-transparent text-neutral-200'
                }`}>
                {`${filterItem.days} Days`}
              </button>
            );
          })}
        </div>

        {daysFilter.map((filterItem) => {
          if (!filterItem.hasPrevious || filterItem.days !== currentDays)
            return null;
          return (
            <div
              key={`previous-filter-${filterItem.days}`}
              className="w-full md:w-auto flex items-center mt-15 md:mt-0">
              <div className="flex items-center mr-20">
                <span
                  className={`w-[0.25rem] md:w-[0.375rem] h-[0.25rem] md:h-[0.375rem] mr-5 rounded-full bg-secondary-500`}></span>
                <span className="text-baseForeground text-10 md:text-14">
                  {`Current ${filterItem.name}`}
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`w-[0.25rem] md:w-[0.375rem] h-[0.25rem] md:h-[0.375rem] mr-5 rounded-full bg-primary-600`}></span>
                <span className="text-baseForeground text-10 md:text-14">
                  {`Previous ${filterItem.name}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[calc(100%+1.625rem)] md:w-[calc(100%+0.6rem)] h-[240px] md:h-[338px]">
        <Chart
          days={currentDays}
          data={[...data]}
          label="Number of transactions"
        />
      </div>
    </div>
  );
}

export default ChartBox;
