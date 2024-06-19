import { buildChartTheme } from '@visx/xychart';
import {
  BarStackDataType,
  ChartType,
  ColorBlockchainMapType,
} from './ChartBarBox.type';
import { DailySummaryType } from 'types';
import { getDaysDifference } from 'utils/common';
import { DateRange } from 'react-day-picker';

export const BAR_CHART_BLOCKCHAIN_NUMBER = 10;

export const DEFAULT_MARGIN = { top: 40, right: 0, bottom: 0, left: 20 };

export const transactionTheme = buildChartTheme({
  backgroundColor: 'transparent',
  colors: ['#469BF5', '#F17606'],
  gridColor: '#469BF5',
  tickLength: 8,
  gridColorDark: '',
});

export const volumeTheme = buildChartTheme({
  backgroundColor: 'transparent',
  colors: ['#F17606', '#469BF5'],
  gridColor: '#469BF5',
  tickLength: 8,
  gridColorDark: '',
});

export const barChartColors: string[] = [
  '#469BF5',
  '#29DABA',
  '#D629DA',
  '#4658F5',
  '#9DF546',
  '#F01DA8',
  '#FF8B66',
  '#44F1E6',
  '#29DA7A',
  '#F17606',
  '#8B62FF',
  '#F4C932',
];

export const mobileBottomAxisData = {
  7: { numBottomAxis: 3, startBottomAxis: 1, intervalBottomAxis: 2 },
  30: { numBottomAxis: 3, startBottomAxis: 3, intervalBottomAxis: 10 },
  90: { numBottomAxis: 3, startBottomAxis: 10, intervalBottomAxis: 30 },
};

export const DesktopBottomAxisData = {
  7: { numBottomAxis: 7, startBottomAxis: 0, intervalBottomAxis: 1 },
  30: { numBottomAxis: 6, startBottomAxis: 4, intervalBottomAxis: 5 },
  90: { numBottomAxis: 8, startBottomAxis: 5, intervalBottomAxis: 10 },
};

export const getAxisDayCount = (
  days: number,
  dateRange: DateRange | undefined,
) => {
  if (dateRange?.from && dateRange?.to) {
    const daysDiff = getDaysDifference(dateRange.from, dateRange.to);
    if (daysDiff < 15) return 7;
    if (daysDiff < 50) return 30;
    return 90;
  }

  return days;
};

export const getBarChartData = (chartOption: {
  dailyData: DailySummaryType[];
  isStackBar: boolean;
  type: ChartType;
}) => {
  const { dailyData, isStackBar, type } = chartOption;
  const chartData: BarStackDataType[] = [];
  const colorBlockchainMap: ColorBlockchainMapType = new Map();
  const buckets: string[] = [];

  if (!isStackBar) {
    dailyData.forEach((dailyItem) => {
      const dataItem: BarStackDataType = { date: dailyItem.date };
      dataItem[type === 'transaction' ? 'Transactions' : 'Volume'] =
        type === 'transaction'
          ? dailyItem.count.toString()
          : dailyItem.volume.toString();

      chartData.push(dataItem);
    });

    colorBlockchainMap.set(
      type === 'transaction' ? 'Transactions' : 'Volume',
      type === 'transaction' ? '#469BF5' : '#8B62FF',
    );

    buckets.push(type === 'transaction' ? 'Transactions' : 'Volume');

    return { chartData, colorBlockchainMap, buckets };
  }

  // map sum of value base on type(transaction or volume) for each blockchain
  const sumBlockchainMap = new Map<string, number>();
  dailyData.forEach((dailyItem) => {
    const sum = sumBlockchainMap.get(dailyItem.bucket) || 0;
    const newValue =
      type === 'transaction' ? dailyItem.count : dailyItem.volume;
    sumBlockchainMap.set(dailyItem.bucket, sum + newValue);
  });

  // sort blockchains with sum value base on type (transaction or volume)
  const sortedBlockchain = Array.from(sumBlockchainMap).sort(
    (a, b) => b[1] - a[1],
  );

  // get top blockchains for stack bars
  const topBlockchain = sortedBlockchain
    .map((sortedItem) => sortedItem[0])
    .slice(0, BAR_CHART_BLOCKCHAIN_NUMBER);

  // create map structure for assign color for each blockchain
  topBlockchain.forEach((blockchainItem, index) => {
    colorBlockchainMap.set(
      blockchainItem,
      barChartColors[index % barChartColors.length],
    );
    buckets.push(blockchainItem);
  });
  colorBlockchainMap.set('Others', barChartColors[barChartColors.length - 1]);
  buckets.push('Others');

  // create map structure for assign chart data for each date
  const dateMap = new Map<string, DailySummaryType[]>();
  dailyData.forEach((dailyItem) => {
    if (!dateMap.has(dailyItem.date)) dateMap.set(dailyItem.date, []);

    const dateItem = dateMap.get(dailyItem.date);
    dateItem?.push(dailyItem);
  });

  // create data result for bar stack chart
  dateMap.forEach((dateDailyList, keyDate) => {
    const dataItem: BarStackDataType = { date: keyDate };
    dateDailyList
      .filter((dailyItem) => topBlockchain.includes(dailyItem.bucket))
      .forEach((topDailyItem) => {
        const bucketValue =
          type === 'transaction' ? topDailyItem.count : topDailyItem.volume;
        dataItem[topDailyItem.bucket] = bucketValue
          ? bucketValue.toString()
          : '0';
      });

    topBlockchain.forEach((topItem) => {
      if (!(topItem in dataItem)) dataItem[topItem] = '0';
    });

    const otherBlockchains = dateDailyList.filter(
      (dailyItem) => !topBlockchain.includes(dailyItem.bucket),
    );

    const othersValue = otherBlockchains
      .map((dailyItem) =>
        type === 'transaction' ? dailyItem.count : dailyItem.volume,
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    dataItem['Others'] = othersValue.toString();

    chartData.push(dataItem);
  });

  return { chartData, colorBlockchainMap, buckets };
};

export const getTotalValueDates = (
  data: BarStackDataType[],
  buckets: string[],
) => {
  const totalValueDates = data.reduce((accumulator, currentData) => {
    const totalValuePerDate = buckets.reduce((dailyTotal, currentBucket) => {
      dailyTotal += !isNaN(Number(currentData[currentBucket]))
        ? Number(currentData[currentBucket])
        : 0;
      return dailyTotal;
    }, 0);
    accumulator.push(totalValuePerDate);
    return accumulator;
  }, [] as number[]);

  return totalValueDates;
};
