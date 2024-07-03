/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChartProps,
  BarStackDataType,
  TooltipDataType,
} from './ChartBarBox.type';
import { getDayOfMonth } from 'utils/common';
import {
  DEFAULT_MARGIN,
  DesktopBottomAxisData,
  barChartColors,
  getAxisDayCount,
  getTotalValueDates,
  mobileBottomAxisData,
} from './ChartBarBox.helper';
import { AmountConverter, compactNumberFormat } from 'utils/amountConverter';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { Fragment, useEffect, useMemo, useRef } from 'react';

import { BarStack } from '@visx/shape';

import { Group } from '@visx/group';
import { Grid } from '@visx/grid';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { StatisticDaysFilter } from 'types';

dayjs.extend(utc);

const BarChart = (props: BarChartProps) => {
  const {
    data,
    type,
    days,
    width,
    height,
    margin = DEFAULT_MARGIN,
    colorBlockchainMap,
    buckets,
    dateRange,
  } = props;

  let tooltipTimeout: number;

  const tooltipRef = useRef<HTMLInputElement>(null);
  const axisDays = useMemo(
    () => getAxisDayCount(days, dateRange),
    [days, dateRange],
  );
  // bounds
  const xMax = width - margin.left - 20;
  const yMax = height - margin.top - 30;

  const isMobile = width <= 640;
  // accessors
  const getDate = (d: BarStackDataType) => d.date;
  // handle bottom axis data
  const allDate = data.map(getDate);

  // handle bottom axis data
  const bottomAxisData = isMobile
    ? mobileBottomAxisData
    : DesktopBottomAxisData;

  const { intervalBottomAxis, numBottomAxis, startBottomAxis } =
    bottomAxisData[axisDays as StatisticDaysFilter];

  // Function to generate tick values at intervals of 5, starting from the 5th element
  const generateTickValues = (dates: string[]) => {
    const tickValues = [];
    for (let i = startBottomAxis; i < dates.length; i += intervalBottomAxis) {
      tickValues.push(dates[i]);
    }
    return tickValues;
  };

  const bottomAxisValue = generateTickValues(allDate);

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipDataType>();

  const totalValueDates = getTotalValueDates(data, buckets);

  // scales
  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    paddingInner: axisDays === 7 ? 0.3 : 0.46,
    paddingOuter: axisDays === 90 ? 1 : 0.3,
  });

  const totalValue = Math.max(...totalValueDates);

  const valueScale = scaleLinear<number>({
    domain: [0, totalValue + totalValue / 5],
    nice: true,
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: buckets,
    range: barChartColors,
  });

  const getTotalValue = (dataColumn: BarStackDataType) => {
    let result = 0;
    Object.keys(dataColumn).forEach((key) => {
      if (key !== 'date') {
        const value = dataColumn[key];
        if (!isNaN(Number(value))) {
          result += Number(value);
        }
      }
    });
    return result;
  };

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body />
    scroll: true,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (
        isMobile &&
        tooltipRef?.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        hideTooltip();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tooltipRef]);

  dateScale.range([0, xMax]);
  valueScale.range([yMax, 0]);

  if (width < 10) return null;

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          rx={14}
        />
        <Grid
          top={margin.top}
          left={margin.left + 10}
          xScale={dateScale}
          yScale={valueScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          numTicksRows={5}
          numTicksColumns={0}
          columnLineStyle={{ display: 'none' }}
        />

        <Group top={margin.top} left={margin.left + 10}>
          <BarStack
            data={data}
            keys={buckets}
            x={getDate}
            xScale={dateScale}
            yScale={valueScale}
            color={colorScale}>
            {(barStacks) => {
              // barStacks returns an array of series objects broken down by key.
              // in this case we've got blockchain name
              return barStacks.map((barStack) => {
                // each barStack contains an array of bars, which contain the data
                // for only that series for a given data point. the number of bars in a
                // given stack corresponds to the number of data points in our data array

                return (
                  <>
                    {barStack.bars.map((bar, index) => {
                      // we can then assume that the data in each stack at a given index
                      // is related to the data in all other stacks at that index.
                      const shouldBeHighlighted =
                        tooltipData?.hoveredIndex === index;

                      // we can then decide the opacity for our stacks based on whether the
                      // tooltip is open, and whether the stack being hovered matches the
                      // index passed to our tooltipData
                      const shouldHavePartialOpacity =
                        !shouldBeHighlighted && tooltipOpen;

                      const barColor =
                        colorBlockchainMap.get(barStack.key) || bar.color;

                      return (
                        <rect
                          key={`bar-stack-${barStack.index}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          height={bar.height}
                          width={bar.width}
                          fill={barColor}
                          opacity={shouldHavePartialOpacity ? 0.5 : 1}
                          onClick={(event) => {
                            if (!isMobile) return;

                            if (tooltipTimeout) clearTimeout(tooltipTimeout);
                            const eventSvgCoords = localPoint(event);
                            const left = bar.x + bar.width / 2;
                            setTimeout(() => {
                              showTooltip({
                                tooltipData: { bar, hoveredIndex: index },
                                tooltipTop: eventSvgCoords?.y,
                                tooltipLeft: left,
                              });
                            }, 100);
                          }}
                          onMouseLeave={() => {
                            if (isMobile) return;
                            tooltipTimeout = window.setTimeout(() => {
                              hideTooltip();
                            }, 300);
                          }}
                          onMouseMove={(event) => {
                            if (isMobile) return;

                            if (tooltipTimeout) clearTimeout(tooltipTimeout);
                            // TooltipInPortal expects coordinates to be relative to containerRef
                            // localPoint returns coordinates relative to the nearest SVG, which
                            // is what containerRef is set to in this example.
                            const eventSvgCoords = localPoint(event);
                            const left = bar.x + bar.width / 2 + 40;

                            // make sure to pass the index of the hovered bar
                            showTooltip({
                              tooltipData: { bar, hoveredIndex: index },
                              tooltipTop: eventSvgCoords?.y,
                              tooltipLeft: left,
                            });
                          }}
                        />
                      );
                    })}
                  </>
                );
              });
            }}
          </BarStack>
        </Group>

        <AxisBottom
          top={yMax + margin.top}
          left={margin.left + 10}
          scale={dateScale}
          hideAxisLine
          hideTicks
          numTicks={numBottomAxis}
          tickValues={bottomAxisValue}
          tickFormat={(d) => getDayOfMonth(d)}
          tickLabelProps={() => ({
            fontSize: isMobile ? 10 : 12,
            fill: '#727272',
            textAnchor: 'middle',
          })}
        />

        <AxisLeft
          hideAxisLine
          hideTicks
          numTicks={isMobile ? 3 : 5}
          top={margin.top}
          left={margin.left}
          scale={valueScale}
          tickFormat={(d) => compactNumberFormat(Number(d))}
          tickLabelProps={() => ({
            fontSize: isMobile ? 10 : 12,
            fill: '#727272',
            textAnchor: 'middle',
          })}
        />
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          className="!bg-transparent !shadow-none	">
          <div
            ref={tooltipRef}
            style={{
              boxShadow: '0px 5px 20px 0px rgba(130, 130, 130, 0.20)',
            }}
            className="bg-baseForeground w-[165px] rounded-soft">
            {tooltipData.bar.bar.data.date && (
              <div className="flex items-center text-12  text-primary-500 justify-between text-primary-500 px-10 py-[7px] font-medium">
                <div>
                  {dayjs
                    .utc(tooltipData.bar.bar.data.date)
                    .local()
                    .format('YYYY/MM/DD')
                    .toString()}
                </div>
                <div>
                  {AmountConverter(
                    Number(getTotalValue(tooltipData.bar.bar.data).toFixed(2)),
                  )}
                </div>
              </div>
            )}
            {Array.from(colorBlockchainMap).map((mapItem) => {
              const [blockchainItem, blockchainColor] = mapItem;
              const value = tooltipData.bar.bar.data[blockchainItem];
              return (
                <Fragment key={blockchainItem}>
                  <div className="h-[1px] w-full bg-neutral-300"></div>

                  <div className="flex items-center justify-between text-primary-500 px-10 py-5">
                    <div className="flex items-center justify-start">
                      <span
                        className="w-[6px] h-[6px] rounded-full mr-5"
                        style={{
                          backgroundColor: blockchainColor,
                        }}></span>

                      <span className="text-10">{blockchainItem}</span>
                    </div>
                    <div className="text-10 ml-10">
                      {type === 'volume' && '$'}
                      {!isNaN(Number(value))
                        ? AmountConverter(Number(Number(value).toFixed(2)))
                        : 0}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default BarChart;
