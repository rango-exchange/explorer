/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepChainLogoProps } from './SwapSteps.type';

function SwapStepChainAmount(props: SwapStepChainLogoProps) {
  const { token, refundedToken, firstStep } = props;
  const resultToken = refundedToken ? refundedToken : token;

  return (
    <>
      {firstStep && `${token.realAmount.toFixed(2)} ${token.symbol}`}
      {!firstStep && (
        <>
          {isNaN(token.realAmount)
            ? `Est. ~${token.expectedAmount.toFixed(2)} ${
                token.symbol || token.name
              }`
            : `${resultToken.realAmount.toFixed(2)} ${
                resultToken.symbol
              }  (Est. ~${token.expectedAmount.toFixed(2)} ${
                token.symbol || token.name
              })`}
        </>
      )}
    </>
  );
}

export default SwapStepChainAmount;
