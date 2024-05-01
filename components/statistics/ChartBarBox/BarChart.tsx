import {
  AnimatedAxis,
  AnimatedGrid,
  XYChart,
  BarSeries,
  Tooltip,
  BarStack,
} from '@visx/xychart';
import isMobile from 'is-mobile';

import { BarChartProps } from './ChartBarBox.type';
import { getDayOfMonth } from 'utils/common';
import {
  barChartColors,
  transactionTheme,
  volumeTheme,
} from './ChartBarBox.helper';
import { AmountConverter, compactNumberFormat } from 'utils/amountConverter';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React from 'react';

dayjs.extend(utc);

const BarChart = (props: BarChartProps) => {
  const IsMobile = isMobile({ tablet: true });
  const { series, type, days } = props;
  const barPadding = days === 7 ? 0.6 : 0.4;
  const defaultColor =
    type === 'transaction' ? barChartColors[0] : barChartColors[1];

  return (
    <XYChart
      theme={type === 'transaction' ? transactionTheme : volumeTheme}
      height={IsMobile ? 300 : 475}
      xScale={{ type: 'band', padding: barPadding }}
      yScale={{ type: 'linear' }}>
      <AnimatedAxis
        orientation="bottom"
        hideTicks
        numTicks={IsMobile ? 3 : 7}
        tickFormat={(d) => getDayOfMonth(d)}
      />
      <AnimatedAxis
        orientation="left"
        hideAxisLine
        hideTicks
        tickFormat={(d) => compactNumberFormat(d)}
        numTicks={3}
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

      <BarStack offset={'none'}>
        {series.map((stackItem) => {
          const { name, data, color } = stackItem;
          return (
            <BarSeries
              key={name}
              dataKey={name}
              data={data}
              xAccessor={(d) => d.date}
              yAccessor={(d) => d.value}
              barPadding={0}
              colorAccessor={() => color}
            />
          );
        })}
      </BarStack>

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
        renderTooltip={(tooltipContext: any) => {
          const { tooltipData } = tooltipContext;
          const { datumByKey, nearestDatum } = tooltipData;
          const { datum } = nearestDatum;

          return (
            <div
              style={{
                boxShadow: '0px 5px 20px 0px rgba(130, 130, 130, 0.20)',
              }}
              className="bg-baseForeground rounded-soft">
              {datum?.date && (
                <div className="text-12 py-5 px-10 font-medium text-primary-500">
                  {dayjs
                    .utc(datum.date)
                    .local()
                    .format('YYYY/MM/DD')
                    .toString()}
                </div>
              )}
              {Object.keys(datumByKey).map((datumByKeyItem) => {
                const { key, datum } = datumByKey[datumByKeyItem];
                const stackItem = series.find(
                  (seriesItem) => seriesItem.name === key,
                );
                const stackColor = stackItem ? stackItem.color : defaultColor;
                return (
                  <React.Fragment key={key}>
                    <div className="h-[1px] w-full bg-neutral-300"></div>

                    <div className="flex items-center justify-between px-10 py-5">
                      <div className="flex items-center justify-start">
                        <span
                          className="w-[5px] h-[5px] rounded-full mr-5"
                          style={{ backgroundColor: stackColor }}></span>
                        <span className="text-10 text-primary-500">{key}</span>
                      </div>
                      {datum && (
                        <div className="text-10 ml-10">
                          {AmountConverter(datum.value)}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          );
        }}
      />
    </XYChart>
  );
};

export default BarChart;
