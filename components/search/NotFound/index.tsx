import NotFoundImage from 'public/img/notFound.png';
import Image from 'next/image';
import { PropsType } from './NotFound.type';
import Link from 'next/link';

function NotFound(props: PropsType) {
  const { query } = props;
  return (
    <div className="px-25 md:px-0 py-[75px] md:py-[120px] flex flex-col items-center max-w-full md:max-w-3xl">
      <div className="w-full relative">
        <Image
          priority
          rel="preload"
          src={NotFoundImage}
          className="max-w-[240px] md:max-w-max mx-auto"
          alt="Not Found"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="text-18 md:text-45 mt-30 md:mt-50 text-center text-primary-500 font-semibold">
        Oops! We couldn't find what you are looking for
      </div>
      <div className="text-14 text-center md:text-20 text-neutral-800 mt-10 truncate max-w-full">
        The search string you entered was: <br className="md:hidden" />
        {query || ''}
        <br />
        This is an invalid search string.
      </div>
      <Link
        href="/"
        className="text-baseForeground bg-primary-600 py-8 md:py-10 px-20 mt-20 md:mt-50 text-center rounded-full w-[280px] md:w-[228px] text-16 md:text-18 font-medium">
        Back To Home
      </Link>
    </div>
  );
}
export default NotFound;
