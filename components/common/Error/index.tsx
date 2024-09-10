import Image from 'next/image';
import { useRouter } from 'next/router';
import errorImage from 'public/img/error.png';
import Layout from '../Layout';

function Error() {
  const router = useRouter();

  return (
    <Layout hasSearchInput title="Something went wrong">
      <div className="flex flex-col py-[75px] md:py-[120px] items-center">
        <div className="w-full relative">
          <Image
            priority
            rel="preload"
            src={errorImage}
            className="max-w-[240px] md:max-w-max md:w-auto mx-auto"
            alt="error"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="text-18 md:text-45 mt-30 md:mt-50 text-primary-500 font-semibold">
          Sorry, something went wrong
        </div>
        <div className="text-14 md:text-20 w-[80%] text-center mt-10 md:mt-5 text-neutral-800">
          An unexpected error has occurred. If reloading the page does not fix
          it, please contact Rango support.
        </div>
        <button
          onClick={() => router.reload()}
          className="text-baseForeground bg-primary-600 py-8 md:py-10 px-20 mt-20 md:mt-50 text-center rounded-full w-[280px] md:w-[228px] text-16 md:text-18 font-medium">
          Reload
        </button>
      </div>
    </Layout>
  );
}

export default Error;
