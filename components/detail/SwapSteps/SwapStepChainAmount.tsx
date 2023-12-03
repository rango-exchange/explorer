/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepChainLogoProps } from './SwapSteps.type';

function SwapStepChainAmount(props: SwapStepChainLogoProps) {
  const { token } = props;
  const { symbol, name, realAmount, expectedAmount } = token;
  return (
    <>
      {isNaN(realAmount)
        ? `Est. ~${expectedAmount.toFixed(2)} ${symbol || name}`
        : `${realAmount.toFixed(2)} ${symbol}  (Est. ~${expectedAmount.toFixed(
            2,
          )} ${symbol || name})`}
    </>
  );
}

export default SwapStepChainAmount;
