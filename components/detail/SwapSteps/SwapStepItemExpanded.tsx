import React from 'react';
import { SwapStepItemExpandedProps } from './SwapSteps.type';
import { columns } from './SwapSteps.helper';

function SwapStepItemExpanded(props: SwapStepItemExpandedProps) {
  const { step, open, firstStep } = props;
  const { from, to } = step;
  const {
    symbol: fromSymbol,
    name: fromName,
    blockchain: fromBlockchain,
  } = from;
  const { symbol: toSymbol, name: toName, blockchain: toBlockchain } = to;

  return (
    <div
      className={`transition-[max-height] duration-[0.7s] ease-in-out ${
        open ? 'max-h-[500px]' : 'max-h-0'
      }`}>
      <div className="pt-35 text-22 text-primary-500">
        {`Swap from ${fromSymbol || fromName} (on ${fromBlockchain}) to ${
          toSymbol || toName
        } (on ${toBlockchain})`}
      </div>

      <div className="pt-25">
        {columns.map((col, index) => {
          const StepValueComponent = col.component;
          const { title, id } = col;
          return (
            <>
              <div key={`column-${id}`} className="grid grid-cols-7">
                <div className="text-16 font-medium p-16 pl-0 col-span-3 text-primary-500 flex items-center">
                  {`${title} : `}
                </div>
                {StepValueComponent && (
                  <StepValueComponent
                    firstStep={firstStep}
                    column={col}
                    step={step}
                  />
                )}
              </div>
              {index !== columns.length - 1 && (
                <div className="h-[0.5px] w-full bg-neutral-300"></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SwapStepItemExpanded;
