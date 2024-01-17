import { SvgIconPropsWithChildren } from '../SvgIcon';

export type RefreshButtonProps = {
  onClick: (() => void) | undefined;
  refreshTime: number;
};

export type RefreshProgressButtonProps = SvgIconPropsWithChildren & {
  progress: number;
};

export type EllipseProps = {
  fill?: string;
  progress?: number;
};
