import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Navbar from '../Navbar';
import { LayoutProps } from './Layout.type';
import Footer from '../Footer';

function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <div className="max-h-full w-full">
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar theme={'light'} hasSearchInput={props.hasSearchInput} />
      <main className="w-full min-h-600 md:min-h-[800px] pb-30 md:pb-50 bg-neutral-300  bg-body-mask bg-cover">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
