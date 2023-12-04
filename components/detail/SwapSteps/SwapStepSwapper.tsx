/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepItemProps } from './SwapSteps.type';
import { InternalPathType, SwapStatus } from 'types';
import { BorderColor } from './SwapSteps.helper';

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
        const swapperStatus: SwapStatus =
          index === swappers.length - 1 ? status : 'success';
        const borderColor = BorderColor[swapperStatus];

        return (
          <>
            {index !== 0 && (
              <div
                className={`bg-transaction ml-[0.875rem] border-l border-solid ${borderColor}  w-fll h-[0.5rem]`}></div>
            )}
            <div
              key={`swapper-${internalSwapper.swapperId}`}
              className="flex items-center">
              <img
                className={`mr-10 border w-[1.75rem] h-[1.75rem] border-solid ${borderColor} rounded-full`}
                src={internalSwapper?.swapperLogo}
                alt={internalSwapper?.swapperTitle}
              />
              <div className="text-18 text-primary-500">
                {internalSwapper?.swapperType === 'DEX'
                  ? `Swap on ${internalFrom?.blockchain} via ${internalSwapper?.swapperTitle}`
                  : `Swap from ${internalFrom?.blockchain} to ${internalTo?.blockchain} via ${internalSwapper?.swapperTitle}`}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default SwapStepSwapper;
