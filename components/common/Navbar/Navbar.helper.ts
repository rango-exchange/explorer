import widgetIcon from 'public/icons/widget.svg';
import apiIcon from 'public/icons/apiManagement.svg';
import affiliateIcon from 'public/icons/affiliate.svg';
import docsIcon from 'public/icons/docs.svg';
import { LinkTypes, MenuTypes } from './Navbar.type';

export const links: Array<LinkTypes | MenuTypes> = [
  {
    location: '/',
    title: 'Home',
    id: 1,
    type: 'link',
    openInNewTab: false,
  },
  {
    location: 'https://app.rango.exchange',
    title: 'Rango App',
    id: 2,
    type: 'link',
    openInNewTab: true,
  },
  {
    title: 'Resources',
    type: 'menu',
    id: 3,
    subMenu: [
      {
        title: 'API/SDK',
        location: 'https://rango-api.readme.io/reference/meta',
        openInNewTab: true,
        icon: apiIcon,
      },
      {
        title: 'Widget',
        location: 'https://docs.rango.exchange/widget-integration/overview',
        openInNewTab: true,
        icon: widgetIcon,
      },
      {
        title: 'Affiliate',
        location: 'https://rango.exchange/affiliate',
        openInNewTab: true,
        icon: affiliateIcon,
      },
      {
        title: 'Docs',
        location: 'https://docs.rango.exchange',
        openInNewTab: true,
        icon: docsIcon,
      },
    ],
  },
];
