import SuccessIcon from 'public/icons/success.svg';
import RunningIcon from 'public/icons/running.svg';
import FailIcon from 'public/icons/fail.svg';

export const SwapStatusIcon = {
  running: RunningIcon,
  failed: FailIcon,
  success: SuccessIcon,
  unknown: RunningIcon,
};

export const BackgroundStatus = {
  running: 'bg-backgroundRunning',
  failed: 'bg-backgroundFailed',
  success: 'bg-backgroundSuccess',
  unknown: 'bg-backgroundRunning',
};

export const TextColorStatus = {
  running: 'text-running',
  failed: 'text-failed',
  success: 'text-success',
  unknown: 'text-running',
};
