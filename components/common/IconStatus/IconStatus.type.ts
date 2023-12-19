import { SwapStatus } from 'types';
import { SvgIconProps } from '../SvgIcon';

export interface PropsType {
  status: SwapStatus;
  hasTitle?: boolean;
}

export type StatusInfoType = {
  [key in SwapStatus]: {
    title: string;
    color: string;
    backgroundColor: string;
    icon: React.ComponentType<SvgIconProps>;
  };
};
