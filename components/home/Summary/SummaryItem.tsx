import React from 'react';
import { SummaryItemProps } from './Summary.type';
import { AmountConverter } from 'utils/amountConverter';

function SummaryItem(props: SummaryItemProps) {
  const { value, title } = props;
  return (
    <div className="p-10 md:p-25 flex flex-col justify-center bg-neutral-700 rounded-soft md:rounded-normal">
      <p className="text-10 md:text-12 text-neutral-100 mb-10">{title}</p>
      <p className="text-14 md:text-28 font-semibold text-baseForeground">
        {AmountConverter(value)}
      </p>
    </div>
  );
}

export default SummaryItem;
