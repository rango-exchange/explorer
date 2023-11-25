import Footer from '../Footer';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Navbar from '../Navbar';
import { LayoutProps } from './Layout.type';

function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <div className="max-h-full">
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar theme={'light'} />
      <main
        className="w-full  min-h-[800px] pb-50 bg-neutral-300  bg-body-mask bg-cover"
        style={{
          width: '-webkit-fill-available',
        }}>
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
