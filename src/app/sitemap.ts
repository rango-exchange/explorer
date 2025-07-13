import type { MetadataRoute } from 'next';
import { WEBSITE_URL } from 'src/constant/meta';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE_URL,
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/statistics`,
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/search`,
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/swap`,
      priority: 0.8,
    },
    {
      url: `https://app.rango.exchange/`,
      priority: 0.9,
    },
    {
      url: `https://docs.rango.exchange`,
      priority: 0.9,
    },
  ];
}
