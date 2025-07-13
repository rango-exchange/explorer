'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { CloseIcon, PasteIcon, SearchIcon } from 'src/components/icons';
import { PropTypes } from './SearchInput.type';
const BLUR_DELAY = 300;

function SearchInput(props: PropTypes) {
  const { hasSubmitButton = true, roundedFull, className, handleClose } = props;
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = () => {
    inputRef.current?.blur();
    setIsFocused(false);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (query) {
      const params = new URLSearchParams();
      params.set('query', query);
      router.push(`/search?${params.toString()}`, {});
      handleBlur();
      clearQuery();
      handleClose?.();
    }
  };

  useEffect(() => {
    handleBlur();
    clearQuery();
  }, [router]);

  const handlePaste = async (event: MouseEvent<HTMLDivElement>) => {
    setIsFocused(true);
    event.preventDefault();
    if (navigator.clipboard !== undefined) {
      const pastedText = await navigator.clipboard.readText();
      setQuery(pastedText);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, BLUR_DELAY);
  };

  useEffect(() => {
    setIsFirefox(navigator?.userAgent.includes('Firefox'));
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-none md:bg-neutral-500 flex justify-center md:justify-start items-center ${
        roundedFull
          ? 'rounded-full py-2.5 w-full'
          : 'rounded-soft md:py-8 w-full md:w-[66%]'
      } flex-col md:flex-row`}>
      <div
        className={`w-full bg-neutral-500 md:bg-none  
      ${
        roundedFull
          ? 'rounded-full px-2.5'
          : 'rounded-soft md:rounded-none p-12 md:py-0 md:px-25'
      }
       flex justify-between items-center`}>
        <div className="flex justify-start w-full items-center">
          <div className="mr-5">
            <SearchIcon size="1.25rem" className="text-neutral-400" />
          </div>
          <input
            ref={inputRef}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            className={`w-11/12 outline-none focus:outline-none focus-visible:outline-none overflow-hidden whitespace-nowrap	text-ellipsis font-normal text-neutral-200 bg-neutral-500 focus:outline-0 text-12 md:text-16 ${className}`}
            placeholder={
              !isFocused ? 'Search by Request ID, Wallet or Tx Hash' : ''
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {query.length !== 0 ? (
          <div className="cursor-pointer ml-10" onClick={() => setQuery('')}>
            <CloseIcon className="text-neutral-400" size="0.75rem" />
          </div>
        ) : (
          isFocused &&
          !isFirefox && (
            <div className="cursor-pointer ml-10" onClick={handlePaste}>
              <PasteIcon className="text-white" size="1.25rem" />
            </div>
          )
        )}
      </div>

      {hasSubmitButton && (
        <Button
          onClick={onSubmit}
          className="mt-10 md:mt-0 mr-0 md:mr-10 w-full md:w-[112px] py-15 px-20 ">
          Search
        </Button>
      )}
    </form>
  );
}

export default SearchInput;
