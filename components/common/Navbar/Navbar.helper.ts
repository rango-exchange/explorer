import { LinkTypes, MenuTypes } from './Navbar.type';

export const links: Array<LinkTypes | MenuTypes> = [
  {
    location: 'https://www.defispot.com/',
    title: 'Platform',
    id: 1,
    type: 'link',
    openInNewTab: false,
  },
  {
    location: 'https://intercom.help/defispot-help/en/',
    title: 'Help Center',
    id: 2,
    type: 'link',
    openInNewTab: true,
  },
  {
    location: '/',
    title: 'Docs',
    type: 'link',
    id: 3,
    openInNewTab: true,
  },
  {
    location: '/',
    title: 'Blog',
    type: 'link',
    id: 4,
    openInNewTab: true,
  },
];
