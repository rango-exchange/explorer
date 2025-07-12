import {
  AffiliateIcon,
  ApiManagementIcon,
  DocsIcon,
  WidgetIcon,
} from 'src/components/icons';
import { LinkTypes, MenuTypes } from './Header';

export const getSearchInputVisibility = (pathname: string) => {
  return pathname !== '/';
};

export const links: Array<LinkTypes | MenuTypes> = [
  {
    location: '/',
    title: 'Home',
    id: 1,
    type: 'link',
    openInNewTab: false,
  },
  {
    location: '/statistics',
    title: 'Statistics',
    id: 2,
    type: 'link',
    openInNewTab: false,
  },
  {
    location: 'https://app.rango.exchange',
    title: 'Rango App',
    id: 3,
    type: 'link',
    openInNewTab: true,
  },
  {
    title: 'Resources',
    type: 'menu',
    id: 4,
    subMenu: [
      {
        title: 'API/SDK',
        location: 'https://rango-api.readme.io/reference/meta',
        openInNewTab: true,
        icon: ApiManagementIcon,
      },
      {
        title: 'Widget',
        location: 'https://docs.rango.exchange/widget-integration/overview',
        openInNewTab: true,
        icon: WidgetIcon,
      },
      {
        title: 'Affiliate',
        location: 'https://rango.exchange/affiliate',
        openInNewTab: true,
        icon: AffiliateIcon,
      },
      {
        title: 'Docs',
        location: 'https://docs.rango.exchange',
        openInNewTab: true,
        icon: DocsIcon,
      },
    ],
  },
];
