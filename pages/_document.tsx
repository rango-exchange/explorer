// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

const description = 'Track all transactions on Rango Exchange';
const socialTitle = 'Rango Exchange Explorer';
const BASE_URL = 'https://scan.rango.exchange';
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
        </Head>
        <body className="bg-background">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
