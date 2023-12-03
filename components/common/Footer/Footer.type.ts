import { SvgIconProps } from '../SvgIcon';

export interface ListItemProps {
  location: string;
  openInNewTab: boolean;
  title: string;
  icon?: React.ComponentType<SvgIconProps>;
}
