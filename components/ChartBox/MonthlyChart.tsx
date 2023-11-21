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
import { ChartProps } from './Chart.type';
import { CustomTick } from './CustomTick';

export const MonthlyChart = (props: ChartProps) => {
  const { data } = props;
  console.log('data monthly', data);
  return (
    <XYChart
      theme={customTheme}
      height={300}
      xScale={{ type: 'band' }}
      yScale={{ type: 'linear' }}>
      <AnimatedAxis
        tickComponent={(props) => <CustomTick {...props} />}
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

      <AnimatedLineSeries
        curve={curveCardinal}
        dataKey="Last month"
        data={data}
        stroke="#469BF5"
        xAccessor={(d) => d.date}
        yAccessor={(d) => d.count}
      />

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        renderTooltip={({ tooltipData }: any) => (
          <div className="text-xs">
            <div className="mb-1">Swaps</div>

            <div className="mb-1">
              {dayjs(tooltipData.nearestDatum.datum.date.split('T')[0]).format(
                'dddd, YYYY MMMM DD',
              )}
            </div>
            <div className="mb-1">
              Count: {tooltipData.nearestDatum.datum.count}
            </div>
          </div>
        )}
      />
    </XYChart>
  );
};
