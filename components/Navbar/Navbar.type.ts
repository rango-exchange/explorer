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
> & { icon: any };

export interface NavbarProps {
  theme: 'dark' | 'light';
}

export interface DeviceProps {
  className: string;
  renderChildren: boolean;
  links: Array<LinkTypes | MenuTypes>;
  theme: 'dark' | 'light';
}

export interface MenuProps {
  subMenu: SubMenuTypes[];
  showSubMenu: boolean;
  title: string;
}

export interface MobileMenuProps {
  showMenu: boolean;
  links: Array<LinkTypes | MenuTypes>;
  onClose: () => void;
}
