import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, MouseEvent, useState } from 'react';
import SearchIcon from 'public/icons/Search.svg';
import { Button } from '../Button';

function SearchInput() {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const onSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (query) {
      router.push({
        pathname: '/search',
        query: { query },
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-neutral-500 w-[66%] py-8 flex items-center rounded-soft">
      <div className="w-full px-25 flex justify-center items-center">
        <Image
          src={SearchIcon}
          className="mr-5"
          alt="icon"
          width={16}
          height={16}
        />
        <input
          className="w-full text-neutral-200 bg-neutral-500 focus:outline-0 overflow-hidden text-16"
          placeholder="Search by Request ID / Wallet Address / Txn Hash"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Button onClick={onSubmit} className="mr-10 w-[112px] py-15 px-20">
        Search
      </Button>
    </form>
  );
}

export default SearchInput;
