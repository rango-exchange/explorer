import React, { useState } from 'react';
import { SwapStepItemProps } from './SwapSteps.type';
import UpIcon from 'public/icons/chevronUp.svg';
import DownIcon from 'public/icons/chevronDown.svg';
import nextIcon from 'public/icons/next.svg';
import Image from 'next/image';
import TransactionURL from './TransactionURL';
import SwapStepItemExpanded from './SwapStepItemExpanded';
import { BorderColor } from './SwapSteps.helper';

function SwapStepItem(props: SwapStepItemProps) {
  const { step, firstStep } = props;
  const {
    fromAsset,
    toAsset,
    swapperId,
    fromAmount,
    toAmount,
    status,
    explorerUrls,
  } = step;
  const { symbol: fromSymbol, name: fromName } = fromAsset;
  const { symbol: toSymbol, name: toName } = toAsset;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const borderColor = BorderColor[status];
  return (
    <>
      {!firstStep && (
        <div
          className={`bg-transaction ml-25 border-l border-dotted ${borderColor}  w-fll h-[20px]`}></div>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`p-25 w-full cursor-pointer rounded-normal border-solid ${borderColor} border`}>
        <div className="flex items-center justify-between">
          <div className="text-18 text-primary-500">{`Swap on ${fromAsset.blockchain} via ${swapperId}`}</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[26px] h-[26px] p-5 bg-surfacesBackground flex items-center justify-center cursor-pointer rounded-full">
            <Image
              color="red"
              src={isOpen ? UpIcon : DownIcon}
              alt={isOpen ? 'collapse' : 'expand'}
              height={12}
              width={12}
            />
          </button>
        </div>
        <div className="pl-30 overflow-hidden">
          <div className="flex items-center my-15">
            {/* TODO  fix from and to images */}
            {/* <Image src={fromImage} alt={fromSymbol || fromName} /> */}
            <span className="text-14 text-neutral-400">{`${parseFloat(
              Number(fromAmount).toFixed(2),
            )} ${fromSymbol || fromName}`}</span>
            <Image
              className="mx-5"
              src={nextIcon}
              alt="next"
              height={16}
              width={16}
            />
            {/* <Image src={toImage} alt={fromSymbol || fromName} /> */}
            <span className="text-14 text-neutral-400">{`${parseFloat(
              Number(toAmount).toFixed(2),
            )} ${toSymbol || toName}`}</span>
          </div>
          <TransactionURL explorerUrls={explorerUrls} status={status} />
          <SwapStepItemExpanded
            firstStep={firstStep}
            step={step}
            open={isOpen}
          />
        </div>
      </div>
    </>
  );
}

export default SwapStepItem;
