import { buildChartTheme } from '@visx/xychart';

export const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const customTheme = buildChartTheme({
  backgroundColor: '#fff',
  colors: ['rgba(0, 169, 187, 0.5)'],
  gridColor: '#00A9BB',
  tickLength: 8,
  gridColorDark: '',
});
