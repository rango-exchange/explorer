import { SvgIconProps } from '../SvgIcon';

export interface LinkTypes {
  location: string;
  title: string;
  openInNewTab: boolean;
  type: 'link';
  id: number;
}

export type MenuTypes = Pick<LinkTypes, 'id' | 'title'> & {
  subMenu: SubMenuTypes[];
  type: 'menu';
};

export type SubMenuTypes = Pick<
  LinkTypes,
  'location' | 'title' | 'openInNewTab'
> & { icon: React.ComponentType<SvgIconProps> };

export interface NavbarProps {
  theme: 'dark' | 'light';
  hasSearchInput?: boolean;
}

export interface DeviceProps {
  className: string;
  hasSearchInput?: boolean;
  renderChildren: boolean;
  links: Array<LinkTypes | MenuTypes>;
  theme: 'dark' | 'light';
}

export interface MenuProps {
  subMenu: SubMenuTypes[];
  showSubMenu: boolean;
  title: string;
  hasSearchInput?: boolean;
  theme: 'dark' | 'light';
}

export interface MobileMenuProps {
  showMenu: boolean;
  links: Array<LinkTypes | MenuTypes>;
  onClose: () => void;
}
