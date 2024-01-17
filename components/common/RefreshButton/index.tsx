import React, { useEffect, useState } from 'react';

import RefreshProgressButton from './RefreshProgressButton';
import { RefreshButtonProps } from './RefreshButton.type';

const REFRESH_INTERVAL = 1000;
const MAX_PERCENTAGE = 100;

export default function RefreshButton(props: RefreshButtonProps) {
  const { onClick, refreshTime } = props;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRefetch, setIsRefetch] = useState(false);

  const handleVisibilityChange = (interval?: number) => {
    if (document.hidden && interval) {
      clearTimeout(interval);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (onClick) {
      interval = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);

        if (elapsedTime === refreshTime) {
          handleRefreshClick();
        }
      }, REFRESH_INTERVAL);
    } else {
      clearTimeout(interval);
    }

    document.addEventListener('visibilitychange', () =>
      handleVisibilityChange(interval),
    );

    return () => {
      document.removeEventListener('visibilitychange', () =>
        handleVisibilityChange(interval),
      );
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [elapsedTime, onClick]);

  const clearTimeout = (interval?: number) => {
    if (interval) {
      clearInterval(interval);
    }
    setElapsedTime(0);
  };

  const handleRefreshClick = () => {
    if (onClick) onClick();
    setElapsedTime(0);
    setIsRefetch(true);
  };

  return (
    <button onClick={handleRefreshClick} disabled={!onClick}>
      <div
        className="p-[2px]"
        style={{
          ...(isRefetch && {
            transform: `rotate(360deg)`,
            transition: 'transform 1s ease-in-out',
          }),
        }}
        onTransitionEnd={() => setIsRefetch(false)}>
        <RefreshProgressButton
          size="24"
          className="text-neutral-400"
          progress={(elapsedTime / refreshTime) * MAX_PERCENTAGE}
        />
      </div>
    </button>
  );
}
