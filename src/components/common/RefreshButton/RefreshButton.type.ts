import { SvgIconPropsWithChildren } from '../SvgIcon';

export type RefreshButtonProps = {
  elapsedTime: number;
  isRefreshInProgress: boolean;
  handleRefreshInProgressEnd: () => void;
  handleClick: () => void;
};

export type RefreshProgressButtonProps = SvgIconPropsWithChildren & {
  progress: number;
};

export type EllipseProps = {
  fill?: string;
  progress?: number;
};
