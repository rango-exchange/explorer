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
        className={`py-15 px-10 md:p-25 w-full cursor-pointer rounded-soft md:rounded-normal border-solid ${borderColor} border group`}>
        <div className="flex justify-between">
          <SwapStepSwapper step={step} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[26px] h-[26px] hidden md:flex text-neutral-400 group-hover:text-hoverIcon p-5 bg-surfacesBackground group-hover:bg-hoverBackground items-center justify-center cursor-pointer rounded-full">
            {isOpen ? (
              <ChevronUpIcon size="0.625rem" />
            ) : (
              <ChevronDownIcon size="0.625rem" />
            )}
          </button>
        </div>
        <div className="pl-10 md:pl-30 z-10">
          <div className="flex md:hidden flex-col my-15">
            <div className="flex items-center">
              <SwapStepChainLogo token={from} />
              <span className="text-12 ml-5 text-neutral-400">
                <SwapStepChainAmount firstStep={firstStep} token={from} />
              </span>
            </div>
            <div
              className={`bg-transaction ml-[8px] border-l border-solid border-neutral-400  w-fll h-[12px]`}></div>
            <div className="flex items-center">
              <SwapStepChainLogo token={to} />
              <span className="text-12 ml-5 text-neutral-400">
                <SwapStepChainAmount token={to} />
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center my-15">
            <SwapStepChainLogo token={from} />
            <span className="text-14 text-neutral-400">
              <SwapStepChainAmount firstStep={firstStep} token={from} />
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
          className={`bg-transaction ml-15 md:ml-25 border-l border-dotted ${borderColor}  w-fll h-[20px]`}></div>
      )}
    </>
  );
}

export default SwapStepItem;
