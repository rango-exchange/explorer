import Image from 'next/image';
import { SelectBlockchainProps } from './SelectBlockchainProps.types';
import { useEffect, useRef, useState } from 'react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  SearchIcon,
} from 'components/icons';
import { containsText } from 'utils/common';

export function SelectBlockchain(props: SelectBlockchainProps) {
  const { className, label, options, selected, onSelect } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [searchedFor, setSearchedFor] = useState<string>('');
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedBlockchain = options.find((item) => item.name === selected);
  let filteredList = options;
  if (searchedFor) {
    filteredList = options.filter(
      (item) =>
        containsText(item.displayName, searchedFor) ||
        containsText(item.shortName, searchedFor) ||
        containsText(item.name, searchedFor),
    );
  }

  const handleCloseOptions = () => {
    setOpen(false);
    setSearchedFor('');
  };

  const handleCloseClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    onSelect('');
  };

  const handleClickOutsideSelect = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      handleCloseOptions();
    }
  };

  const handleSelect = (optionName: string) => {
    if (selectedBlockchain?.name !== optionName) {
      onSelect(optionName);
    }
    handleCloseOptions();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSelect);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSelect);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className || ''}`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-soft w-[200px] h-[32px] bg-neutral-300 py-5 px-10 hover:bg-hoverBackground">
        <div className="w-full flex  items-center justify-between">
          <div className="flex items-center text-12">
            {selectedBlockchain ? (
              <>
                <div className="w-[20px] h-[20px] relative mr-5">
                  <Image
                    src={selectedBlockchain.logo}
                    alt={selectedBlockchain.displayName}
                    title={selectedBlockchain.displayName}
                    fill
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <div>{selectedBlockchain.shortName}</div>
              </>
            ) : (
              label
            )}
          </div>
          <div className="flex items-center">
            {selected && (
              <>
                <button type="button" onClick={handleCloseClick}>
                  <CloseIcon
                    className="text-neutral-400 hover:text-hoverIcon"
                    size="8px"
                  />
                </button>
                <span className="text-neutral-400 mx-10">|</span>
              </>
            )}
            {open ? (
              <ChevronUpIcon className="w-[12px]" size="12px" />
            ) : (
              <ChevronDownIcon className="w-[12px]" size="10px" />
            )}
          </div>
        </div>
      </button>

      {open && (
        <div
          className="w-[200px] h-[256px] absolute top-[35px] z-10 rounded-soft overflow-y-scroll p-5 bg-baseForeground"
          style={{
            boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.10)',
          }}>
          <div className="flex items-center rounded-soft mb-10 p-5 bg-surfacesBackground ">
            <SearchIcon className="mr-10 text-neutral-400" />
            <input
              className="w-full bg-transparent text-10 text-neutral-400 focus:outline-none"
              placeholder="Search chain"
              onChange={(e) => setSearchedFor(e.target.value)}
            />
          </div>
          {filteredList.map((option) => (
            <button
              key={option.name}
              className="w-full p-5 flex items-center justify-between rounded-micro mb-10 hover:bg-hoverBackground"
              type="button"
              onClick={() => handleSelect(option.name)}>
              <div className="flex items-start justify-start">
                <div className="w-[20px] h-[20px] relative mr-5">
                  <Image
                    src={option.logo}
                    alt={option.displayName}
                    title={option.displayName}
                    fill={true}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <div className="text-14">{option.shortName}</div>
              </div>
              {selectedBlockchain &&
                selectedBlockchain.name === option.name && (
                  <CheckIcon className="text-secondary-500" size="12px" />
                )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
