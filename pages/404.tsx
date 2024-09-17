import Layout from 'components/common/Layout';
import Image from 'next/image';
import Link from 'next/link';
import pageNotFoundImage from 'public/img/404.png';

function NotFoundPage() {
  return (
    <Layout hasSearchInput title="Page Not Found">
      <div className="flex flex-col py-[75px] md:py-[120px] items-center">
        <div className="w-full relative">
          <Image
            priority
            rel="preload"
            src={pageNotFoundImage}
            className="max-w-[240px] md:max-w-max mx-auto"
            alt="404"
          />
        </div>
        <div className="text-18 md:text-45 mt-30 md:mt-50 text-primary-500 font-semibold">
          Page Not Found
        </div>
        <div className="text-14 md:text-20 text-neutral-800 mt-10">
          Sorry, we couldn’t find that page.
        </div>
        <Link
          href="/"
          className="text-baseForeground bg-primary-600 py-8 md:py-10 px-20 mt-20 md:mt-50 text-center rounded-full w-[280px] md:w-[228px] text-16 md:text-18 font-medium">
          Back To Home
        </Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
