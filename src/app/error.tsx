'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import errorImage from 'public/img/error.png';

const ReloadButton = dynamic(
  () => import('src/components/common/ReloadButton'),
  {
    ssr: false,
  },
);

const Error = () => {
  return (
    <div className="flex flex-col py-[75px] md:py-[120px] items-center">
      <div className="w-full relative">
        <Image
          priority
          rel="preload"
          src={errorImage}
          className="max-w-[240px] md:max-w-max md:w-auto mx-auto"
          alt="error"
        />
      </div>
      <div className="text-18 md:text-45 mt-30 md:mt-50 text-primary-500 font-semibold">
        Sorry, something went wrong
      </div>
      <div className="text-14 md:text-20 w-[80%] text-center mt-10 md:mt-5 text-neutral-800">
        An unexpected error has occurred. If reloading the page does not fix it,
        please contact Rango support.
      </div>
      <ReloadButton />
    </div>
  );
};

export default Error;
