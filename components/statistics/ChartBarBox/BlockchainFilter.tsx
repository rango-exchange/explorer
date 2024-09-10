import React, { Fragment, useState } from 'react';
import { BlockchainFilterProps } from './ChartBarBox.type';
import Image from 'next/image';
import { CheckIcon, SearchIcon } from 'components/icons';
import { containsText } from 'utils/common';

function BlockchainFilter(props: BlockchainFilterProps) {
  const { blockchains, selectedBlockchain, onSelect } = props;

  const [searchedFor, setSearchedFor] = useState<string>('');

  let filteredList = blockchains;
  if (searchedFor) {
    filteredList = blockchains.filter(
      (item) =>
        containsText(item.displayName, searchedFor) ||
        containsText(item.shortName, searchedFor) ||
        containsText(item.name, searchedFor),
    );
  }

  const handleSelect = (optionName: string) => {
    if (selectedBlockchain !== optionName) {
      onSelect(optionName);
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="flex items-center rounded-soft h-[40px] mb-10 px-5 bg-surfacesBackground ">
        <SearchIcon className="mr-10 text-neutral-400" />
        <input
          className="w-full bg-transparent text-12 text-neutral-400 focus:outline-none"
          placeholder="Search chain"
          onChange={(e) => setSearchedFor(e.target.value)}
        />
      </div>
      {filteredList.map((option, index) => (
        <Fragment key={option.name}>
          <button
            className="w-full py-15 px-5 flex items-center justify-between rounded-micro hover:bg-hoverBackground"
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
            {selectedBlockchain && selectedBlockchain === option.name && (
              <CheckIcon className="text-secondary-500" size="12px" />
            )}
          </button>
          {index !== filteredList.length - 1 && (
            <div className="w-full h-[1px] bg-neutral-300"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default BlockchainFilter;
