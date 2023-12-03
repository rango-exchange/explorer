import React, { useState } from 'react';
import { SwapStepItemProps } from './SwapSteps.type';
import TransactionURL from './TransactionURL';
import SwapStepItemExpanded from './SwapStepItemExpanded';
import { BorderColor } from './SwapSteps.helper';
import { ChevronDownIcon, ChevronUpIcon, NextIcon } from 'components/icons';
import SwapStepChainLogo from './SwapStepChainLogo';
import SwapStepChainAmount from './SwapStepChainAmount';
import SwapStepSwapper from './SwapStepSwapper';

function SwapStepItem(props: SwapStepItemProps) {
  const { step, firstStep, lastStep } = props;
  const { from, to, status, explorerUrls } = step;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const borderColor = BorderColor[status];

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`p-25 w-full cursor-pointer rounded-normal border-solid ${borderColor} border`}>
        <div className="flex justify-between">
          <SwapStepSwapper step={step} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[26px] h-[26px] text-neutral-400 hover:text-hoverIcon p-5 bg-surfacesBackground hover:bg-hoverBackground flex items-center justify-center cursor-pointer rounded-full">
            {isOpen ? (
              <ChevronUpIcon size="0.625rem" />
            ) : (
              <ChevronDownIcon size="0.625rem" />
            )}
          </button>
        </div>
        <div className="pl-30 z-10 overflow-hidden">
          <div className="flex items-center my-15">
            <SwapStepChainLogo token={from} />
            <span className="text-14 text-neutral-400">
              <SwapStepChainAmount token={from} />
            </span>
            <NextIcon className="mx-10 text-primary-500" />
            <SwapStepChainLogo token={to} />
            <span className="text-14 text-neutral-400">
              <SwapStepChainAmount token={to} />
            </span>
          </div>
          <TransactionURL explorerUrls={explorerUrls} status={status} />
          <SwapStepItemExpanded
            firstStep={firstStep}
            step={step}
            open={isOpen}
          />
        </div>
      </div>
      {!lastStep && (
        <div
          className={`bg-transaction ml-25 border-l border-dotted ${borderColor}  w-fll h-[20px]`}></div>
      )}
    </>
  );
}

export default SwapStepItem;
