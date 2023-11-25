import { curveCardinal } from '@visx/curve';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';
import { customTheme, getDayOfMonth, getRoundedCount } from './Chart.helper';
import dayjs from 'dayjs';
import { CustomTick } from './CustomTick';
import { ChartProps } from './Chart.type';

export const Chart = (props: ChartProps) => {
  const { data, days } = props;
  const currentWeek = data.slice(24, 31).map((item) => ({ ...item }));
  const prevWeek = data.slice(17, 24).map((item) => ({ ...item }));

  // Update the date property of each item in prevWeek with the corresponding item from deepCopyCurrentWeek
  prevWeek.forEach((item, index) => {
    prevWeek[index].date = currentWeek[index].date;
  });

  return (
    <div className="w-full">
      <XYChart
        theme={customTheme}
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}>
        <AnimatedAxis
          tickComponent={(props) => (
            <CustomTick dxValue={days === 7 ? 15 : 30} {...props} />
          )}
          orientation="bottom"
          hideTicks
          numTicks={7}
          tickFormat={(d) => getDayOfMonth(d)}
        />
        <AnimatedAxis
          orientation="left"
          hideAxisLine
          hideTicks
          numTicks={3}
          tickFormat={(c) => getRoundedCount(c).toString()}
          tickComponent={(props) => <CustomTick {...props} />}
        />
        <AnimatedGrid
          lineStyle={{
            stroke: 'rgba(184, 184, 184, 0.30)',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          columns={false}
          numTicks={3}
        />

        {days === 30 && (
          <AnimatedLineSeries
            curve={curveCardinal}
            dataKey="Last month"
            data={data}
            stroke="#469BF5"
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
          />
        )}

        {days === 7 && (
          <>
            <AnimatedLineSeries
              curve={curveCardinal}
              dataKey="Current Week"
              data={currentWeek}
              stroke="#469BF5"
              xAccessor={(d) => d.date}
              yAccessor={(d) => d.count}
            />
            <AnimatedLineSeries
              curve={curveCardinal}
              dataKey="Prev Week"
              data={prevWeek}
              stroke="#242D5B"
              xAccessor={(d) => d.date}
              yAccessor={(d) => d.count}
            />
          </>
        )}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData }: any) => (
            <div className="text-12">
              <div className="mb-1">Swaps</div>

              <div className="mb-1">
                {dayjs(
                  tooltipData.nearestDatum.datum.date.split('T')[0],
                ).format('dddd, YYYY MMMM DD')}
              </div>
              <div className="mb-1">
                Count: {tooltipData.nearestDatum.datum.count}
              </div>
            </div>
          )}
        />
      </XYChart>
    </div>
  );
};
