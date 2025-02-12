'use client';

import React, { PropsWithChildren, useState } from 'react';
import { PropsType } from './Tooltip.type';

const Tooltip = (props: PropsWithChildren<PropsType>) => {
  const { label, children } = props;
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}>
      {children}
      {isTooltipVisible && (
        <div
          style={{ boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.10)' }}
          className={`z-50 absolute flex items-center justify-center leading-[0.6875rem] text-11 bg-surfacesTooltip rounded-full
           font-medium text-primary-500 py-5 px-10 whitespace-nowrap bottom-[-28px] left-0}`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
