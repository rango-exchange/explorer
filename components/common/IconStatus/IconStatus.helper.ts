import { FailIcon, RunningIcon, SuccessIcon } from 'components/icons';

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
