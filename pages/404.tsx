import Navbar from 'components/common/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import notFound404 from 'public/img/404.svg';
import notFoundImage from 'public/img/notFound.png';

function NotFoundPage() {
  return (
    <div className="h-full w-full bg-body-mask bg-cover">
      <Navbar theme="dark" />
      <main className="w-full flex justify-center">
        <div className="container flex flex-col mt-[100px] items-center">
          <div className="w-full relative">
            <div className="w-full pt-1/4 opacity-75">
              <Image src={notFound404} className="mx-auto	w-1/2" alt="404" />
            </div>
            <div className="w-full flex justify-center absolute top-1/4">
              <Image className="w-1/4" src={notFoundImage} alt="Not Found!" />
            </div>
          </div>
          <div className="text-16 md:text-45 pt-[100px] text-primary-500 font-semibold">
            Page Not Found
          </div>
          <div className="text-14 md:text-20 text-neutral-800">
            There is no page with this URL!
          </div>
          <Link
            href="/"
            className="text-baseForeground bg-primary-600 py-15 px-20 mt-50 text-center rounded-full w-[224px] text-14 md:text-18 font-medium">
            Back To Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
