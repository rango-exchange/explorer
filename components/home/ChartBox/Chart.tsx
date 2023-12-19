import { curveCardinal } from '@visx/curve';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';
import { customTheme, daysFilter, getDayOfMonth } from './Chart.helper';
import { CustomTick } from './CustomTick';
import { ChartProps } from './Chart.type';
import isMobile from 'is-mobile';

const Chart = (props: ChartProps) => {
  const IsMobile = isMobile({ tablet: true });
  const { data, days } = props;
  const currentFilter = daysFilter.find((item) => item.days === days);
  const currentPeriod = currentFilter?.hasPrevious
    ? data.slice(days * -1).map((item) => ({ ...item }))
    : null;
  const prevPeriod = currentFilter?.hasPrevious
    ? data.slice(days * -2, days * -1).map((item) => ({ ...item }))
    : null;

  // Update the date property of each item in prevWeek with the corresponding item from deepCopyCurrentWeek
  if (prevPeriod && currentPeriod)
    prevPeriod.forEach((item, index) => {
      prevPeriod[index].date = currentPeriod[index]?.date;
    });

  return (
    <div className="w-full">
      <XYChart
        theme={customTheme}
        height={IsMobile ? 240 : 300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}>
        <AnimatedAxis
          tickComponent={(props) => (
            <CustomTick dxValue={days === 7 ? 15 : 30} {...props} />
          )}
          orientation="bottom"
          hideTicks
          numTicks={IsMobile ? 3 : 7}
          tickFormat={(d) => getDayOfMonth(d)}
        />
        <AnimatedAxis
          orientation="left"
          hideAxisLine
          hideTicks
          numTicks={3}
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

        {days === 90 && (
          <AnimatedLineSeries
            curve={curveCardinal}
            dataKey="Last Season"
            data={data}
            stroke="#469BF5"
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
          />
        )}

        {days !== 90 && currentPeriod && prevPeriod && (
          <>
            <AnimatedLineSeries
              curve={curveCardinal}
              dataKey={`Current ${currentFilter ? currentFilter.name : ''}`}
              data={currentPeriod}
              stroke="#469BF5"
              xAccessor={(d) => d.date}
              yAccessor={(d) => d.count}
            />
            <AnimatedLineSeries
              curve={curveCardinal}
              dataKey={`Prev ${currentFilter ? currentFilter.name : ''}`}
              data={prevPeriod}
              stroke="#242D5B"
              xAccessor={(d) => d.date}
              yAccessor={(d) => d.count}
            />
          </>
        )}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showDatumGlyph
          applyPositionStyle={true}
          style={{
            background: 'transparent',
          }}
          unstyled={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderTooltip={({ tooltipData }: any) => (
            <div className="bg-tooltipBackground px-[8px] py-[4px] rounded-[8px] text-baseForeground text-12">
              {tooltipData.nearestDatum.datum.count}
            </div>
          )}
        />
      </XYChart>
    </div>
  );
};

export default Chart;
