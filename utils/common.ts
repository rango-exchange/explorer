export const CopyText = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

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

// Function to set the date to the start of the day in UTC (00:00:00.000) and return the timestamp
export function getStartOfDayUTCTimestamp(date: Date): number {
  const newDate = new Date(date);
  const currentDate = new Date();
  newDate.setHours(
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getMilliseconds(),
  );

  return newDate.setUTCHours(0, 0, 0, 0);
}

// Function to set the date to the end of the day in UTC (23:59:59.999) and return the timestamp
export function getEndOfDayUTCTimestamp(date: Date): number {
  const newDate = new Date(date);
  const currentDate = new Date();
  newDate.setHours(
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getMilliseconds(),
  );
  return newDate.setUTCHours(23, 59, 59, 999);
}

export function getDaysDifference(startDate: Date, endDate: Date): number {
  // Convert dates to milliseconds
  const oneDay: number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  // Calculate the difference in milliseconds
  const diffMilliseconds: number = Math.abs(
    startDate.getTime() - endDate.getTime(),
  );

  // Convert milliseconds to days and return the floor value
  return Math.floor(diffMilliseconds / oneDay);
}
