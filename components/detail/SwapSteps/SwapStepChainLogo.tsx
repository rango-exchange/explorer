/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepChainLogoProps } from './SwapSteps.type';

function SwapStepChainLogo(props: SwapStepChainLogoProps) {
  const { token } = props;
  const { symbol, logo, blockchainLogo, name, blockchain } = token;

  return (
    <div className="relative mr-5">
      <img
        className="z-0"
        src={logo}
        alt={symbol || name}
        width={27}
        height={27}
      />
      <img
        src={blockchainLogo}
        width={12}
        height={12}
        alt={blockchain}
        className="absolute right-[-2px] bottom-[-2px] z-10"
      />
    </div>
  );
}

export default SwapStepChainLogo;
