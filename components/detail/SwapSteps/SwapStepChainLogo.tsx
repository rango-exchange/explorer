/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SwapStepChainLogoProps } from './SwapSteps.type';
import { DEFAULT_TOKEN_LOGO } from 'constant';

function SwapStepChainLogo(props: SwapStepChainLogoProps) {
  const { token } = props;
  const { symbol, logo, name, blockchainData } = token;
  const { shortName: blockchainShortName, logo: blockchainLogo } =
    blockchainData;

  return (
    <div className="relative mr-5">
      <img
        className="z-0 w-[17px] md:w-[27px] h-[17px] md:h-[27px] rounded-full"
        src={logo || DEFAULT_TOKEN_LOGO}
        alt={symbol || name}
      />
      <img
        src={blockchainLogo || DEFAULT_TOKEN_LOGO}
        alt={blockchainShortName}
        className="rounded-full absolute w-[10px] md:w-[12px] h-[10px] md:h-[12px] right-[-2px] bottom-[-2px] z-10"
      />
    </div>
  );
}

export default SwapStepChainLogo;
