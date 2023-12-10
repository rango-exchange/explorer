import { useRouter } from 'next/router';
import { FormEvent, MouseEvent, useState } from 'react';
import { Button } from '../Button';
import { SearchIcon } from 'components/icons';

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
      className="bg-none md:bg-neutral-500 w-full md:w-[66%] md:py-8 flex justify-center md:justify-start items-center rounded-soft flex-col md:flex-row ">
      <div className="w-full bg-neutral-500 md:bg-none p-12 rounded-soft md:rounded-none md:py-0 md:px-25 flex justify-center items-center">
        <SearchIcon className="mr-5 text-neutral-400" />
        <input
          className="w-full text-neutral-200 bg-neutral-500 focus:outline-0 overflow-hidden text-14 md:text-16"
          placeholder="Search by Request ID / Wallet..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Button
        onClick={onSubmit}
        className="mt-10 md:mt-0 mr-0 md:mr-10 w-full md:w-[112px] py-15 px-20 ">
        Search
      </Button>
    </form>
  );
}

export default SearchInput;
