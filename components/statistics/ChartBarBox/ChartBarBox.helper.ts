import { DailySummaryType } from 'types';
import type { BarStackDataType, ColorBucketMapType } from '@rango-dev/charts';
import { ChartType } from './ChartBarBox.type';

export const BAR_CHART_BLOCKCHAIN_NUMBER = 10;

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

export const prepareBarChartData = (chartOption: {
  dailyData: DailySummaryType[];
  isStackBar: boolean;
  type: ChartType;
}) => {
  const { dailyData, isStackBar, type } = chartOption;
  const chartData: BarStackDataType[] = [];
  const colorBlockchainMap: ColorBucketMapType = new Map();
  const buckets: string[] = [];

  if (!isStackBar) {
    let key: string;
    if (type === 'transaction') key = 'Transactions';
    else if (type === 'volume') key = 'Volume';
    else if (type === 'unique-wallets') key = 'Unique Wallets';
    else
      throw new Error(
        "Unsupported type for preparing data when it's not stackbar",
      );

    dailyData.forEach((dailyItem) => {
      const dataItem: BarStackDataType = { date: dailyItem.date };

      let value: string;
      if (type === 'transaction') value = dailyItem.count.toString();
      else if (type === 'volume') value = dailyItem.volume.toString();
      else if (type === 'unique-wallets')
        value = dailyItem.uniqueWallets.toString();
      else
        throw new Error(
          "Unsupported type for preparing data when it's not stackbar",
        );

      dataItem[key] = value;

      chartData.push(dataItem);
    });

    let color: string;
    if (type === 'volume') color = '#8B62FF';
    if (type === 'unique-wallets') color = '#f4c932';
    else color = '#469BF5'; // transaction type

    colorBlockchainMap.set(key, color);

    buckets.push(key);

    return { chartData, colorBlockchainMap, buckets };
  }

  // map sum of value base on type(transaction or volume) for each blockchain
  const sumBlockchainMap = new Map<string, number>();
  dailyData.forEach((dailyItem) => {
    const sum = sumBlockchainMap.get(dailyItem.bucket) || 0;

    let newValue: number;
    if (type === 'transaction') newValue = dailyItem.count;
    else if (type === 'volume') newValue = dailyItem.volume;
    else if (type === 'unique-wallets') newValue = dailyItem.uniqueWallets;
    else throw new Error('Unsupported type for preparing data');

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
        let bucketValue: number;
        if (type === 'transaction') bucketValue = topDailyItem.count;
        else if (type === 'volume') bucketValue = topDailyItem.volume;
        else if (type === 'unique-wallets')
          bucketValue = topDailyItem.uniqueWallets;
        else
          throw new Error('Unsupported type for preparing data and stack bar');

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
      .map((dailyItem) => {
        if (type === 'transaction') return dailyItem.count;
        else if (type === 'volume') return dailyItem.volume;
        else if (type === 'unique-wallets') return dailyItem.uniqueWallets;
        else
          throw new Error(
            'Unsupported type for preparing data and others value',
          );
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    dataItem['Others'] = othersValue.toString();

    chartData.push(dataItem);
  });

  return { chartData, colorBlockchainMap, buckets };
};
