'use client';

import dayjs from 'dayjs';
import { LocalDateProps } from './LocalDate.types';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function LocalDate(props: LocalDateProps) {
  const { date, format = 'MMMM D, YYYY | hh:mm:ss A' } = props;

  return <>{dayjs.utc(date).local().format(format).toString()}</>;
}

export default LocalDate;
