import { PropsType, ValidDaysFilter } from './Chart.type';
import { useState } from 'react';
import { Chart } from './Chart';
import { daysFilter } from './Chart.helper';

function ChartBox(props: PropsType) {
  const { data } = props;
  const [currentDays, setCurrentDays] = useState<ValidDaysFilter>(7);

  return (
    <div className="pl-[60px]">
      <div className="flex items-center justify-between pr-[40px]">
        <div className="flex items-center bg-neutral-700 p-5 rounded-normal">
          {daysFilter.map((filterItem) => {
            return (
              <button
                key={`day-filter-${filterItem.days}`}
                onClick={() => setCurrentDays(filterItem.days)}
                className={`text-14 rounded-soft px-15 py-10 font-normal	 ${
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
              className="flex items-center">
              <div className="flex items-center mr-20">
                <span
                  className={`w-[0.6rem] h-[0.6rem] mr-5 rounded-full bg-secondary-500`}></span>
                <span className="text-baseForeground text-14">
                  {`Current ${filterItem.name}`}
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`w-[0.6rem] h-[0.6rem] mr-5 rounded-full bg-secondary-700`}></span>
                <span className="text-baseForeground text-14">
                  {`Previous ${filterItem.name}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <Chart days={currentDays} data={[...data]} />
    </div>
  );
}

export default ChartBox;
