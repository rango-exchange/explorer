import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ParentSize } from '@visx/responsive';
import { MOBILE_BREAK_POINT } from 'constant';
import { MainProvider } from 'hooks/MainContext';

export default function App({ Component, pageProps }: AppProps): ReactNode {
  return (
    <>
      <NextNProgress color="#00A9BB" height={2} showOnShallow={true} />

      <ParentSize>
        {({ width }) => {
          const isMobile = width <= MOBILE_BREAK_POINT;
          return (
            <MainProvider isMobile={isMobile}>
              <Component {...pageProps} />
            </MainProvider>
          );
        }}
      </ParentSize>

      <ToastContainer />
    </>
  );
}
