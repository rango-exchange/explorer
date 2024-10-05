import React from 'react';
import { PropsType } from './SwapSteps.type';
import SwapStepItem from './SwapStepItem';
import { StepType } from 'types';

function SwapSteps(props: PropsType) {
  const { steps } = props;
  return (
    <div className="w-full bg-baseForeground px-15 py-20 md:p-35 mt-20 md:mt-[40px] rounded-soft md:rounded-normal">
      <h2 className="text-12 md:text-28 font-semibold text-primary-500">
        Swap Steps
      </h2>
      <div className="py-15 md:py-25 px-0 md:px-20">
        {steps.map((step: StepType, key: number) => (
          <SwapStepItem
            lastStep={key === steps.length - 1}
            firstStep={key === 0}
            key={`step-${key}`}
            step={step}
          />
        ))}
      </div>
    </div>
  );
}

export default SwapSteps;
