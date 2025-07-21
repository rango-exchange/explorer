import {
  DiscordIcon,
  GithubIcon,
  MediumIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'src/components/icons';
import { ListItemProps } from './Footer.type';

export const products: ListItemProps[] = [
  {
    location: 'https://app.rango.exchange/',
    title: 'DApp',
    openInNewTab: true,
  },
  {
    location: 'https://rango.exchange/apis',
    title: 'SDK',
    openInNewTab: false,
  },
  {
    location: 'https://rango.exchange/apis',
    title: 'API',
    openInNewTab: false,
  },
  {
    location: 'https://rango.exchange/widget',
    title: 'Widget',
    openInNewTab: false,
  },
];

export const documentation: ListItemProps[] = [
  {
    location:
      'https://docs.rango.exchange/api-integration/basic-api-single-step',
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
    icon: DiscordIcon,
  },
  {
    location: 'https://twitter.com/RangoExchange',
    title: 'Twitter',
    openInNewTab: true,
    icon: TwitterIcon,
  },
  {
    location: 'https://t.me/rangoexchange',
    title: 'Telegram',
    openInNewTab: true,
    icon: TelegramIcon,
  },
  {
    location: 'https://medium.com/@rangoexchange',
    title: 'Medium',
    openInNewTab: true,
    icon: MediumIcon,
  },

  {
    location: 'https://www.youtube.com/@rangoexchange',
    title: 'YouTube',
    openInNewTab: true,
    icon: YoutubeIcon,
  },
  {
    location: 'https://github.com/rango-exchange',
    title: 'GitHub',
    openInNewTab: true,
    icon: GithubIcon,
  },
];
