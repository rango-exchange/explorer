import NotFoundImage from 'public/img/notFound.svg';
import Image from 'next/image';
import { PropsType } from './NotFound.type';
import Link from 'next/link';

function NotFound(props: PropsType) {
  const { query } = props;
  return (
    <div className="container px-25 md:px-0 py-30 md:py-[120px] flex flex-col items-center">
      <Image
        src={NotFoundImage}
        className="h-[148px] md:h-[318px]"
        alt="Not Found"
      />
      <div className="text-16 md:text-45 pt-[45px] md:pt-[100px] text-center text-primary-500 font-semibold">
        Oops! We couldn't find what you are looking for
      </div>
      <div className="text-14 md:text-20 text-neutral-800 pt-10">
        {`The search string you entered was: ${query || ''}`}
      </div>
      <div className="text-14 md:text-20 text-neutral-800">
        This is an invalid search string.
      </div>
      <Link
        href="/"
        className="text-baseForeground bg-primary-600 py-10 md:py-15 px-20 mt-50 text-center rounded-full w-[224px] text-14 md:text-18 font-medium">
        Back To Home
      </Link>
    </div>
  );
}
export default NotFound;
