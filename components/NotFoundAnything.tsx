import notfound from '../public/img/notfound.svg';
import Image from 'next/image';

const NotFoundAnything: React.FC = () => (
  <div className="w-full bg-neutral-100 rounded-lg text-center py-10">
    <p className="text-12 mb-3 md:mb-7 md:text-28 font-bold">
      Oops! We couldn't find what you are looking for.
    </p>
    <p className="text-12 lg:text-28 mt-2 lg:mt-6">
      Please enter an address, transaction hash, block height or hash.
    </p>
    <Image
      className="m-auto w-full md:w-1/2 lg:w-1/3"
      src={notfound}
      alt="Not Found"
    />
  </div>
);
export default NotFoundAnything;
