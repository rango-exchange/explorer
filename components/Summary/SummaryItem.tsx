import React from 'react';
import { SummaryItemProps } from './Summary.type';
import { AmountConverter } from 'utils/amountConverter';

function SummaryItem(props: SummaryItemProps) {
  const { value, title } = props;
  return (
    <div className="p-25 flex flex-col justify-center bg-neutral-700 rounded-normal">
      <p className="text-xs text-neutral-100 mb-10">{title}</p>
      <p className="text-xl font-semibold text-baseForeground">
        {AmountConverter(value)}
      </p>
    </div>
  );
}

export default SummaryItem;
