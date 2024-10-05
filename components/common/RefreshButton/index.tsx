import React from 'react';

const REFRESH_TIME = 30;

import RefreshProgressButton from './RefreshProgressButton';
import { RefreshButtonProps } from './RefreshButton.type';

// const REFRESH_INTERVAL = 1000;
const MAX_PERCENTAGE = 100;

export default function RefreshButton(props: RefreshButtonProps) {
  const {
    handleClick,
    elapsedTime,
    isRefreshInProgress,
    handleRefreshInProgressEnd,
  } = props;

  return (
    <button onClick={handleClick}>
      <div
        className="p-[2px]"
        style={{
          ...(isRefreshInProgress && {
            transform: `rotate(360deg)`,
            transition: 'transform 1s ease-in-out',
          }),
        }}
        onTransitionEnd={() => handleRefreshInProgressEnd()}>
        <RefreshProgressButton
          size="24"
          className="text-neutral-400"
          progress={(elapsedTime / REFRESH_TIME) * MAX_PERCENTAGE}
        />
      </div>
    </button>
  );
}
