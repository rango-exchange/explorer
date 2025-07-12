/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const unitlist = ['', 'K', 'M', 'B'];
export function AmountConverter(number: number) {
  const sign = Math.sign(number);
  let unit = 0;
  while (Math.abs(number) > 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 10) / 100;
  }
  return sign * Math.abs(number) + unitlist[unit];
}

export function getPercentageChange(
  input: number | null,
  output: number | null,
) {
  if (!input || !output) return null;
  return parseFloat(Number((output / input - 1) * 100).toFixed(2));
}

export function numberWithCommas(number: number) {
  if (!number || isNaN(number)) return number;

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function compactNumberFormat(number: number) {
  if (!number || isNaN(number)) return '0';

  const numberFormat = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);

  return numberFormat;
}
