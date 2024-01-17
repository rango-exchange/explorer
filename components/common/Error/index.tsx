import Navbar from 'components/common/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import errorImage from 'public/img/error.png';

function Error() {
  const router = useRouter();

  return (
    <div className="h-full w-full bg-body-mask bg-cover">
      <Navbar theme="dark" />
      <main className="w-full flex justify-center">
        <div className="container flex flex-col mt-[100px] items-center">
          <div className="w-full relative">
            <div className="w-full pt-1/4 opacity-75">
              <Image
                src={errorImage}
                className="w-1/2 md:w-auto mx-auto"
                alt="error"
              />
            </div>
          </div>
          <div className="text-16 md:text-45 pt-[45px] md:pt-[100px] text-primary-500 font-semibold">
            Sorry, something went wrong
          </div>
          <div className="text-14 md:text-20 w-[80%] text-center mt-10 md:mt-5 text-neutral-800">
            An unexpected error has occurred. If reloading the page does not fix
            it, please contact Rango support.
          </div>
          <button
            onClick={() => router.reload()}
            className="text-baseForeground bg-primary-600 py-10 md:py-15 px-20 mt-50 text-center rounded-full w-[224px] text-14 md:text-18 font-medium">
            Reload
          </button>
        </div>
      </main>
    </div>
  );
}

export default Error;
