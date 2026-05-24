const HOST = 'https://explorer.rango.exchange';
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${HOST}/sitemap.xml`,
  };
}
