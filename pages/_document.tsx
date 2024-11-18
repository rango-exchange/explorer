// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

const description = 'Track all transactions on Rango Exchange';
const socialTitle = 'Rango Exchange Explorer';
const BASE_URL = 'https://explorer.rango.exchange';
const APP_NAME = 'Rango Exchange Explorer';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
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
            content="https://explorer.rango.exchange/preview.jpg"
          />

          <meta property="og:title" content={socialTitle} />
          <meta property="og:type" content="site" />
          <meta property="og:url" content={`${BASE_URL}/`} />
          <meta
            property="og:image"
            content="https://explorer.rango.exchange/preview.jpg"
          />
          <meta property="og:image:alt" content="Rango Exchange Explorer" />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={APP_NAME} />

          <Script id="gtm-script" strategy="afterInteractive">
            {`    
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NWSR9NQK');

            `}
          </Script>
        </Head>
        <body className="bg-background">
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWSR9NQK"  height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
