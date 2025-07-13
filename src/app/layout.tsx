import { Footer } from 'src/components/common/Footer';
import './globals.css';
import Header from 'src/components/common/Header';
import { Metadata } from 'next';
import {
  APP_NAME,
  BASE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  GTM_ID,
  OPEN_GRAPH_TYPE,
  SOCIAL_TITLE,
  TWITTER_CARD,
  TWITTER_SITE,
} from 'src/constant/meta';
import { GoogleTagManager } from '@next/third-parties/google';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `${APP_NAME} | %s`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,

  twitter: {
    card: TWITTER_CARD,
    site: TWITTER_SITE,
    title: SOCIAL_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: TWITTER_SITE,
  },

  openGraph: {
    title: SOCIAL_TITLE,
    type: OPEN_GRAPH_TYPE,
    url: `${BASE_URL}/`,
    description: DEFAULT_DESCRIPTION,
    siteName: APP_NAME,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="bg-background max-h-full w-full">
        <NextTopLoader speed={500} color="#00A9BB" />
        <Header theme={'light'} />
        <main className="w-full min-h-600 md:min-h-[800px] pb-30 md:pb-50 bg-neutral-300  bg-body-mask bg-cover">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
