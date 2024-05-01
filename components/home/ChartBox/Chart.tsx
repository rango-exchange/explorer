import { curveMonotoneX } from '@visx/curve';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  AreaSeries,
} from '@visx/xychart';
import { customTheme, daysFilter } from './Chart.helper';
import { CustomTick } from './CustomTick';
import { ChartProps } from './Chart.type';
import isMobile from 'is-mobile';

import { LinearGradient } from '@visx/gradient';
import { AmountConverter } from 'utils/amountConverter';
import { getDayOfMonth } from 'utils/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Chart = (props: ChartProps) => {
  const IsMobile = isMobile({ tablet: true });
  const { data, days, label } = props;
  const currentFilter = daysFilter.find((item) => item.days === days);
  const currentPeriod = currentFilter?.hasPrevious
    ? data.slice(days * -1).map((item) => ({ ...item }))
    : null;
  const prevPeriod = currentFilter?.hasPrevious
    ? data.slice(days * -2, days * -1).map((item) => ({ ...item }))
    : null;

  const currentPeriodKey = `Current ${currentFilter ? currentFilter.name : ''}`;
  const prevPeriodKey = `Prev ${currentFilter ? currentFilter.name : ''}`;
  // Update the date property of each item in prevWeek with the corresponding item from deepCopyCurrentWeek
  if (prevPeriod && currentPeriod)
    prevPeriod.forEach((item, index) => {
      prevPeriod[index].date = currentPeriod[index]?.date;
    });

  return (
    <XYChart
      theme={customTheme}
      height={IsMobile ? 240 : 338}
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
        <>
          <AreaSeries
            dataKey="Last Season"
            data={data}
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
            curve={curveMonotoneX}
            strokeWidth={1}
            stroke="url(#area-glabelradient)"
            fill="url(#area-gradient)"
          />
          <LinearGradient
            id="area-gradient"
            from="rgba(70, 155, 245, 0.10)"
            fromOpacity={1}
            to="rgba(15, 20, 46, 0)"
            toOpacity={1}
          />
        </>
      )}

      {days !== 90 && currentPeriod && prevPeriod && (
        <>
          {/* previous chart only for week and month */}
          <AnimatedLineSeries
            curve={curveMonotoneX}
            dataKey={prevPeriodKey}
            data={prevPeriod}
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
          />

          {/* current chart only for week and month */}
          <AreaSeries
            dataKey={currentPeriodKey}
            data={currentPeriod}
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
            curve={curveMonotoneX}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
          />
          <LinearGradient
            id="area-gradient"
            from="rgba(70, 155, 245, 0.10)"
            fromOpacity={1}
            to="rgba(15, 20, 46, 0)"
            toOpacity={1}
          />
        </>
      )}

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showDatumGlyph
        showVerticalCrosshair
        showHorizontalCrosshair
        verticalCrosshairStyle={{
          stroke: 'rgba(184, 184, 184, 0.30)',
          strokeDasharray: 3,
        }}
        horizontalCrosshairStyle={{
          stroke: 'rgba(184, 184, 184, 0.30)',
          strokeDasharray: 3,
        }}
        showSeriesGlyphs
        applyPositionStyle
        style={{
          background: 'transparent',
        }}
        unstyled={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderTooltip={({ tooltipData }: any) => (
          <div className="bg-tooltipBackground px-8 py-[4px] rounded-[8px] text-neutral-200 text-12">
            <span className="text-10">
              {dayjs
                .utc(tooltipData.nearestDatum.datum.date)
                .local()
                .format('dddd, D MMMM YYYY')
                .toString()}
            </span>
            {currentPeriod && prevPeriod ? (
              <div>
                <div className="flex items-center mr-20">
                  <span
                    className={`w-[0.25rem] md:w-[0.375rem] h-[0.25rem] md:h-[0.375rem] mr-5 rounded-full bg-secondary-500`}></span>
                  Current:
                  <span className="text-baseForeground pl-1">
                    {AmountConverter(
                      tooltipData.datumByKey[currentPeriodKey].datum.count,
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`w-[0.25rem] md:w-[0.375rem] h-[0.25rem] md:h-[0.375rem] mr-5 rounded-full bg-primary-600`}></span>
                  Previous:
                  <span className="text-baseForeground pl-1">
                    {AmountConverter(
                      tooltipData.datumByKey[prevPeriodKey].datum.count,
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                {label && <p className="text-neutral-200">{label}:</p>}
                <span className="text-baseForeground pl-1">
                  {AmountConverter(tooltipData.nearestDatum.datum.count)}
                </span>
              </div>
            )}
          </div>
        )}
      />
    </XYChart>
  );
};

export default Chart;
