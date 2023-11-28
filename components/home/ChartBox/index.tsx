import { ChartProps, DaysFilter } from './Chart.type';
import { useState } from 'react';
import { Chart } from './Chart';

function ChartBox(props: ChartProps) {
  const { data } = props;
  const [days, setDays] = useState<DaysFilter>(7);

  return (
    <div className="pl-[60px]">
      <div className="flex items-center justify-between pr-[40px]">
        <div className="flex items-center bg-neutral-700 p-5 rounded-normal">
          <button
            onClick={() => setDays(7)}
            className={`text-14 rounded-soft px-15 py-10 font-normal	 ${
              days === 7
                ? 'bg-secondary-500 text-baseForeground'
                : 'bg-transparent text-neutral-200'
            }`}>
            7 Days
          </button>

          <button
            onClick={() => setDays(30)}
            className={`text-14 rounded-soft  px-15 py-10 font-normal	 ${
              days === 30
                ? 'bg-secondary-500 text-baseForeground'
                : 'bg-transparent text-neutral-200'
            }`}>
            30 Days
          </button>
        </div>
        {days === 7 && (
          <div className="flex items-center">
            <div className="flex items-center mr-20">
              <span
                className={`w-[0.6rem] h-[0.6rem] mr-5 rounded-full bg-secondary-500`}></span>
              <span className="text-baseForeground text-14">Current Week</span>
            </div>
            <div className="flex items-center">
              <span
                className={`w-[0.6rem] h-[0.6rem] mr-5 rounded-full bg-secondary-700`}></span>
              <span className="text-baseForeground text-14">Previous Week</span>
            </div>
          </div>
        )}
      </div>
      <Chart days={days} data={[...data]} />
    </div>
  );
}

export default ChartBox;
