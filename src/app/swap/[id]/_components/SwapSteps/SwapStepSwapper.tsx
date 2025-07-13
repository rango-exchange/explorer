/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepItemProps } from './SwapSteps.type';
import { InternalPathType } from 'src/types';
import { BorderColor } from './SwapSteps.helper';
import { DEFAULT_TOKEN_LOGO } from 'src/constant';

function SwapStepSwapper(props: SwapStepItemProps) {
  const { step } = props;
  const { from, to, swapper, internalPath, status } = step;
  const swappers: InternalPathType[] = [...internalPath];
  if (!swappers.length) swappers.push({ from, swapper, to });

  return (
    <div className="flex justify-center flex-col">
      {swappers.map((swapperItem, index) => {
        const {
          from: internalFrom,
          to: internalTo,
          swapper: internalSwapper,
        } = swapperItem;
        const borderColor = BorderColor[status];

        return (
          <React.Fragment key={`swapper-${internalSwapper.swapperId}`}>
            {index !== 0 && (
              <div
                className={`bg-transaction ml-[0.6875rem] md:ml-[0.875rem] border-l border-solid ${borderColor}  w-fll h-[0.3rem] md:h-[0.5rem]`}></div>
            )}
            <div className="flex items-center">
              <img
                className={`mr-5 md:mr-10 border w-[1.375rem] md:w-[1.75rem] h-[1.375rem] md:h-[1.75rem] border-solid ${borderColor} rounded-full`}
                src={internalSwapper?.swapperLogo || DEFAULT_TOKEN_LOGO}
                alt={internalSwapper?.swapperTitle}
              />
              <div className="text-12 md:text-18 text-primary-500">
                {internalSwapper?.swapperType === 'DEX'
                  ? `Swap on ${internalFrom?.blockchainData?.shortName} via ${internalSwapper?.swapperTitle}`
                  : `Bridge from ${internalFrom?.blockchainData?.shortName} to ${internalTo?.blockchainData?.shortName} via ${internalSwapper?.swapperTitle}`}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default SwapStepSwapper;
