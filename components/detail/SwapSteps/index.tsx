import React from 'react';
import { PropsType } from './SwapSteps.type';
import SwapStepItem from './SwapStepItem';
import { StepType } from 'types';

function SwapSteps(props: PropsType) {
  const { steps } = props;
  return (
    <div className="w-full bg-baseForeground p-35 mt-[40px] rounded-normal">
      <h2 className="text-28 font-semibold text-primary-500">Swap Steps</h2>
      <div className="py-25 px-20">
        {steps.map((step: StepType, key: number) => (
          <SwapStepItem firstStep={key === 0} key={`step-${key}`} step={step} />
        ))}
      </div>
    </div>
  );
}

export default SwapSteps;
