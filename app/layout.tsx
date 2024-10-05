import { Footer } from 'components/common/Footer';
import './globals.css';
import Header from 'components/common/Header';
import { Metadata } from 'next';

const description = 'Track all transactions on Rango Exchange';
const socialTitle = 'Rango Exchange Explorer';
const BASE_URL = 'https://scan.rango.exchange';
const APP_NAME = 'Rango Exchange Explorer';

export const metadata: Metadata = {
  title: 'Rango Exchange Explorer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta name="Description" content={description} />
        <meta
          name="keywords"
          content="Rango Exchange, Rango dApp, Multi-chain DEX aggregator, Cross-Chain Swap, binance bridge, 1inch, crypto API, Metamask"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rangoexchange" />
        <meta name="twitter:title" content={socialTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@rangoexchange" />
        <meta
          name="twitter:image"
          content="https://scan.rango.exchange/preview.jpg"
        />

        <meta property="og:title" content={socialTitle} />
        <meta property="og:type" content="site" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta
          property="og:image"
          content="https://scan.rango.exchange/preview.jpg"
        />
        <meta property="og:image:alt" content="Rango Exchange Explorer" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={APP_NAME} />
      </head>
      <body className="bg-background max-h-full w-full">
        <Header theme={'light'} />
        <main className="w-full min-h-600 md:min-h-[800px] pb-30 md:pb-50 bg-neutral-300  bg-body-mask bg-cover">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
