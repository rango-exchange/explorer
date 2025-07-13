'use client';

import RefreshButton from 'src/components/common/RefreshButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const REFRESH_TIME = 30;

export const Timer = () => {
  const [second, setSecond] = useState(REFRESH_TIME);
  const [isRefreshInProgress, setIsRefreshInProgress] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (second > 0) {
        setSecond(second - 1);
      } else {
        setSecond(REFRESH_TIME);
        handleRefresh();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [second]);

  const handleRefresh = () => {
    setIsRefreshInProgress(true);
    router.refresh();
    setSecond(REFRESH_TIME);
  };

  return (
    <>
      <RefreshButton
        elapsedTime={REFRESH_TIME - second}
        isRefreshInProgress={isRefreshInProgress}
        handleRefreshInProgressEnd={() => setIsRefreshInProgress(false)}
        handleClick={handleRefresh}
      />
      <span className="text-10 md:text-14 text-neutral-400">
        Refresh in {second > 9 ? second : `0${second}`} seconds
      </span>
    </>
  );
};
