import discord from 'public/icons/socialMedia/discord.svg';
import github from 'public/icons/socialMedia/github.svg';
import medium from 'public/icons/socialMedia/medium.svg';
import telegram from 'public/icons/socialMedia/telegram.svg';
import twitter from 'public/icons/socialMedia/twitter.svg';
import youtube from 'public/icons/socialMedia/youtube.svg';
import { ListItemProps } from './Footer.type';

export const products: ListItemProps[] = [
  {
    location: 'https://app.rango.exchange/',
    title: 'DApp',
    openInNewTab: true,
  },
  {
    location: './apis',
    title: 'SDK',
    openInNewTab: false,
  },
  {
    location: './apis',
    title: 'API',
    openInNewTab: false,
  },
  {
    location: './widget',
    title: 'Widget',
    openInNewTab: false,
  },
];

export const documentation: ListItemProps[] = [
  {
    location: 'https://docs.rango.exchange/integration-quick-start/overview',
    title: 'SDK Docs',
    openInNewTab: true,
  },
  {
    location: 'https://rango-api.readme.io/reference',
    title: 'API Reference',
    openInNewTab: true,
  },
  {
    location: 'https://docs.rango.exchange/widget-integration/overview',
    title: 'Widget Docs',
    openInNewTab: true,
  },
  {
    location: 'https://playground.rango.exchange/',
    title: 'Widget Playground',
    openInNewTab: true,
  },
];

export const socialMedia: ListItemProps[] = [
  {
    location: 'https://discord.com/invite/q3EngGyTrZ',
    title: 'Discord',
    openInNewTab: true,
    icon: discord,
  },
  {
    location: 'https://twitter.com/RangoExchange',
    title: 'Twitter',
    openInNewTab: true,
    icon: twitter,
  },
  {
    location: 'https://t.me/rangoexchange',
    title: 'Telegram',
    openInNewTab: true,
    icon: telegram,
  },
  {
    location: 'https://medium.com/@rangoexchange',
    title: 'Medium',
    openInNewTab: true,
    icon: medium,
  },

  {
    location: 'https://www.youtube.com/@rangoexchange',
    title: 'YouTube',
    openInNewTab: true,
    icon: youtube,
  },
  {
    location: 'https://github.com/rango-exchange',
    title: 'GitHub',
    openInNewTab: true,
    icon: github,
  },
];
