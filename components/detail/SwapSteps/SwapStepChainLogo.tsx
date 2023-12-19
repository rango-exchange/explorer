/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepChainLogoProps } from './SwapSteps.type';

function SwapStepChainLogo(props: SwapStepChainLogoProps) {
  const { token } = props;
  const { symbol, logo, blockchainLogo, name, blockchain } = token;

  return (
    <div className="relative mr-5">
      <img
        className="z-0 w-[17px] md:w-[27px] h-[17px] md:h-[27px] rounded-full"
        src={logo}
        alt={symbol || name}
      />
      <img
        src={blockchainLogo}
        alt={blockchain}
        className="rounded-full absolute w-[10px] md:w-[12px] h-[10px] md:h-[22px] right-[-2px] bottom-[-2px] z-10"
      />
    </div>
  );
}

export default SwapStepChainLogo;
