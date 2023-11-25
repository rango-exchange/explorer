import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps): ReactNode {
  return (
    <>
      <NextNProgress color="#00A9BB" height={2} showOnShallow={true} />

      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
