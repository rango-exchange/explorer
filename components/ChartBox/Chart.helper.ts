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

export function getDayOfMonth(dateString: string) {
  const date = new Date(dateString);
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const dayNumber = date.getDate();

  return `${dayNumber} ${monthName}`;
}

export function getRoundedCount(count: number) {
  return Math.ceil(count / 1000) * 1000;
}

export const customTheme = buildChartTheme({
  backgroundColor: '#fff',
  colors: ['#469BF5'],
  gridColor: '#469BF5',
  tickLength: 8,
  gridColorDark: '',
});
