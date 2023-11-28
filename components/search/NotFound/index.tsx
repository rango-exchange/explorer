import NotFoundImage from 'public/img/notFound.svg';
import Image from 'next/image';
import { PropsType } from './NotFound.type';
import Link from 'next/link';

function NotFound(props: PropsType) {
  const { query } = props;
  return (
    <div className="w-full py-[120px] flex flex-col items-center">
      <Image src={NotFoundImage} height={318} alt="Not Found" />
      <div className="text-45 pt-[100px] text-primary-500 font-semibold">
        Oops! We couldn't find what you are looking for
      </div>
      <div className="text-20 text-neutral-800 pt-10">
        {`The search string you entered was: ${query || ''}`}
      </div>
      <div className="text-20 text-neutral-800">
        This is an invalid search string.
      </div>
      <Link
        href="/"
        className="text-baseForeground bg-primary-600 py-15 px-20 mt-50 text-center rounded-full w-[224px] text-18 font-medium">
        Back To Home
      </Link>
    </div>
  );
}
export default NotFound;
