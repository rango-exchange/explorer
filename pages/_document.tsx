// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

const description =
  'Multi-chain DEX aggregator, binance bridge, 1inch, Thorchain, Terra Bridge, Terra Swap, crypto API under a unified UX'
class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />

          <meta name="Description" content={description} />
          <meta
            name="keywords"
            content="Rango Exchange, Rango Finance, Multi-chain DEX aggregator, binance bridge, 1inch, Thorchain, Terra Bridge, Terra Swap, crypto API"
          />
        </Head>
        <body className="bg-background">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
