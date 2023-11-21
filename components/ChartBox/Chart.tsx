import { curveCardinal } from '@visx/curve';
import {
  AnimatedGrid,
  XYChart,
  Tooltip,
  Axis,
  AnimatedAreaSeries,
  AnimatedAreaStack,
} from '@visx/xychart';
import dayjs from 'dayjs';
import isMobile from 'is-mobile';
import { ChartProps } from './Chart.type';
import { customTheme, monthsShort } from './Chart.helper';

function Chart(props: ChartProps) {
  const { data } = props;

  const IsMobile = isMobile();
  return (
    <div className="relative flex justify-center overflow-hidden">
      <XYChart
        theme={customTheme}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}>
        <Axis
          orientation="bottom"
          hideAxisLine
          hideTicks
          hideZero
          numTicks={IsMobile ? 4 : 8}
          tickFormat={(d) =>
            `${monthsShort[dayjs(d).month()]} ${dayjs(d).year()}`
          }
        />
        <Axis
          orientation="left"
          hideAxisLine
          hideTicks
          hideZero
          tickValues={[1000, 2000, 3000, 4000]}
          labelProps={{ fontSize: 12, fontWeight: 600 }}
        />

        <AnimatedGrid
          columns={false}
          numTicks={5}
          strokeDasharray="5, 5"
          stroke="#00A9BB"
          lineStyle={{ opacity: 0.5 }}
        />

        <AnimatedAreaStack curve={curveCardinal} renderLine>
          <AnimatedAreaSeries
            dataKey="Daily Interval"
            data={data.slice(0, 15)}
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
            fillOpacity={0}
          />
        </AnimatedAreaStack>

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData }: any) => (
            <div className="text-xs">
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
      <div className="w-full h-12 absolute bottom-12" />
    </div>
  );
}

export default Chart;
