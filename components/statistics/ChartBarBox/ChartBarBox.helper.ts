import { buildChartTheme } from '@visx/xychart';
import { BarStack, ChartData, ChartType } from './ChartBarBox.type';
import { DailySummaryType } from 'types';

export const BAR_CHART_BLOCKCHAIN_NUMBER = 10;

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
  '#8566FF',
  '#44F1E6',
  '#29DA7A',
  '#F4C932',
  '#F17606',
  '#8B62FF',
];

export const getBarChartData = (chartOption: {
  dailyData: DailySummaryType[];
  isStackBar: boolean;
  type: ChartType;
}) => {
  const { dailyData, isStackBar, type } = chartOption;
  const dataSeries: BarStack[] = [];
  const defaultColor = type === 'transaction' ? '#469BF5' : '#8B62FF';

  if (!isStackBar) {
    const chartData: ChartData[] = dailyData.map((dailyItem) => {
      return {
        date: dailyItem.date,
        value: type === 'transaction' ? dailyItem.count : dailyItem.volume,
      };
    });
    dataSeries.push({
      data: chartData,
      name: type === 'transaction' ? 'Transactions' : 'Volume',
      color: defaultColor,
    });

    return dataSeries;
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

  // get n top blockchains for stack bars
  const topBlockchain = sortedBlockchain
    .map((sortedItem) => sortedItem[0])
    .slice(0, BAR_CHART_BLOCKCHAIN_NUMBER);

  // map chart data for each date
  const dateMap = new Map<string, DailySummaryType[]>();
  dailyData.forEach((dailyItem) => {
    if (!dateMap.has(dailyItem.date)) dateMap.set(dailyItem.date, []);

    const dateItem = dateMap.get(dailyItem.date);
    dateItem?.push(dailyItem);
  });

  // prepare top blockchain data for stack bar
  topBlockchain.forEach((topBlockchainItem, index) => {
    const chartData: ChartData[] = [];
    dateMap.forEach((dateDailyList, keyDate) => {
      const blockchainData = dateDailyList.find(
        (listItem) => listItem.bucket === topBlockchainItem,
      );

      // value base on type (transaction or volume)
      let blockchainValue = 0;
      if (blockchainData)
        blockchainValue =
          type === 'transaction' ? blockchainData.count : blockchainData.volume;
      chartData.push({ date: keyDate, value: blockchainValue });
    });

    dataSeries.push({
      data: chartData,
      name: topBlockchainItem,
      color: barChartColors[index % BAR_CHART_BLOCKCHAIN_NUMBER],
    });
  });

  // prepare others blockchain data for stack bar
  const othersChartData: ChartData[] = [];
  dateMap.forEach((dateDailyList, keyDate) => {
    const othersBlockchain = dateDailyList.filter(
      (listDataItem) => !topBlockchain.includes(listDataItem.bucket),
    );

    // sum value (base on type) of blockchains other than tops
    const othersValue = othersBlockchain
      .map((dailyItem) =>
        type === 'transaction' ? dailyItem.count : dailyItem.volume,
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    othersChartData.push({ date: keyDate, value: othersValue });
  });
  dataSeries.push({
    data: othersChartData,
    name: 'Others',
    color: barChartColors[barChartColors.length - 1],
  });

  return dataSeries;
};
