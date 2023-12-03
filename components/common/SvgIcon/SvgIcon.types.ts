export interface SvgIconProps {
  size?: string;
  color?: string;
  className?: string;
}
export type SvgIconPropsWithChildren = SvgIconProps & {
  children?: React.ReactElement;
};
