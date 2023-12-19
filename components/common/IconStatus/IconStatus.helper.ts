import { FailIcon, RunningIcon, SuccessIcon } from 'components/icons';
import { StatusInfoType } from './IconStatus.type';

export const StatusInfo: StatusInfoType = {
  running: {
    title: 'Running',
    color: 'text-running',
    backgroundColor: 'bg-backgroundRunning',
    icon: RunningIcon,
  },
  failed: {
    title: 'Failed',
    color: 'text-failed',
    backgroundColor: 'bg-backgroundFailed',
    icon: FailIcon,
  },
  success: {
    title: 'Complete',
    color: 'text-success',
    backgroundColor: 'bg-backgroundSuccess',
    icon: SuccessIcon,
  },
  unknown: {
    title: 'Running',
    color: 'text-running',
    backgroundColor: 'bg-backgroundRunning',
    icon: RunningIcon,
  },
};
