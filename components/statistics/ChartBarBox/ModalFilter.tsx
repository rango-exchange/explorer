import React, { useEffect, useState } from 'react';
import {
  FilterBarChart,
  ModalFilterType,
  BlockchainFilterType,
} from './ChartBarBox.type';
import { Modal } from 'components/common/modal';
import Image from 'next/image';
import { ChevronRightIcon, CloseIcon } from 'components/icons';
import { BreakDownList } from 'types';
import { Button } from 'components/common/Button';
import BlockchainFilter from './BlockchainFilter';

function ModalFilter(props: ModalFilterType) {
  const { blockchains, selectedFilter, open, onClose, onApply } = props;

  const [filter, setFilter] = useState<FilterBarChart>(selectedFilter);
  const [showBlockchainFilter, setShowBlockchainFilter] =
    useState<boolean>(false);
  const [blockchainFilterType, setBlockchainFilterType] =
    useState<BlockchainFilterType | null>(null);
  const { source, destination, breakDownBy } = filter;
  const hasChange =
    source !== selectedFilter.source ||
    destination !== selectedFilter.destination ||
    breakDownBy !== selectedFilter.breakDownBy;

  const selectedSourceBlockchain = blockchains.find(
    (item) => item.name === source,
  );
  const selectedDestinationBlockchain = blockchains.find(
    (item) => item.name === destination,
  );

  let selectedBlockchain = '';
  if (blockchainFilterType === BlockchainFilterType.source)
    selectedBlockchain = selectedSourceBlockchain?.name || '';
  if (blockchainFilterType === BlockchainFilterType.destination)
    selectedBlockchain = selectedDestinationBlockchain?.name || '';

  let modalTitle = 'Filter';
  if (showBlockchainFilter)
    modalTitle =
      blockchainFilterType === BlockchainFilterType.source
        ? 'Select Source Chain'
        : 'Select Destination Chain';

  const breakDownOptions = Object.keys(BreakDownList).map((breakItem) => {
    return {
      value: BreakDownList[breakItem as keyof typeof BreakDownList],
      label: breakItem,
    };
  });

  const handleShowBlockchainFilter = (type: BlockchainFilterType) => {
    setBlockchainFilterType(type);
    setShowBlockchainFilter(true);
  };

  const handleRemoveSelectedBlockchain = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: BlockchainFilterType,
  ) => {
    e.stopPropagation();
    setFilter((prevState) => ({
      ...prevState,
      [type]: '',
    }));
  };

  const handleSelectedBlockchain = (selected: string) => {
    if (
      blockchainFilterType === BlockchainFilterType.source &&
      selected !== source
    ) {
      setFilter((prevState) => ({
        ...prevState,
        source: selected,
      }));
      setShowBlockchainFilter(false);
    }

    if (
      blockchainFilterType === BlockchainFilterType.destination &&
      destination !== selected
    ) {
      setFilter((prevState) => ({
        ...prevState,
        destination: selected,
      }));
      setShowBlockchainFilter(false);
    }
  };

  useEffect(() => {
    setFilter(selectedFilter);
  }, [selectedFilter]);

  return (
    <Modal
      prefix={
        showBlockchainFilter ? (
          <button type="button" onClick={() => setShowBlockchainFilter(false)}>
            <ChevronRightIcon className="rotate-180" size="1.5rem" />
          </button>
        ) : (
          <button
            onClick={() =>
              setFilter({
                breakDownBy: BreakDownList.None,
                destination: '',
                source: '',
              })
            }
            type="button"
            className="text-12	font-medium text-neutral-400">
            Reset
          </button>
        )
      }
      dismissible={!showBlockchainFilter}
      title={modalTitle}
      onClose={onClose}
      open={open}>
      {!showBlockchainFilter && (
        <div className="w-full h-full flex flex-col justify-between">
          <div>
            <div className="">
              <div className="text-18 font-medium mb-5">Source chain</div>
              <button
                onClick={() =>
                  handleShowBlockchainFilter(BlockchainFilterType.source)
                }
                className="rounded-soft w-full h-[40px] bg-neutral-300 p-10 hover:bg-hoverBackground">
                <div className="w-full flex  items-center justify-between">
                  <div className="flex items-center text-12">
                    {selectedSourceBlockchain ? (
                      <>
                        <div className="w-[20px] h-[20px] relative mr-5">
                          <Image
                            src={selectedSourceBlockchain.logo}
                            alt={selectedSourceBlockchain.displayName}
                            title={selectedSourceBlockchain.displayName}
                            fill
                          />
                        </div>
                        <div>{selectedSourceBlockchain.shortName}</div>
                      </>
                    ) : (
                      <span>Select Source Chain</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {selectedSourceBlockchain && (
                      <>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleRemoveSelectedBlockchain(
                              e,
                              BlockchainFilterType.source,
                            )
                          }>
                          <CloseIcon
                            size="10px"
                            className="text-neutral-400 hover:text-hoverIcon"
                          />
                        </button>
                        <span className="text-neutral-400 mx-10">|</span>
                      </>
                    )}
                    <ChevronRightIcon />
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-35">
              <div className="text-18 font-medium mb-5">Destination chain</div>
              <button
                onClick={() =>
                  handleShowBlockchainFilter(BlockchainFilterType.destination)
                }
                className="rounded-soft w-full h-[40px] bg-neutral-300 p-10 hover:bg-hoverBackground">
                <div className="w-full flex  items-center justify-between">
                  <div className="flex items-center text-12">
                    {selectedDestinationBlockchain ? (
                      <>
                        <div className="w-[20px] h-[20px] relative mr-5">
                          <Image
                            src={selectedDestinationBlockchain.logo}
                            alt={selectedDestinationBlockchain.displayName}
                            title={selectedDestinationBlockchain.displayName}
                            fill
                          />
                        </div>
                        <div>{selectedDestinationBlockchain.shortName}</div>
                      </>
                    ) : (
                      <span>Select Destination Chain</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {selectedDestinationBlockchain && (
                      <>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleRemoveSelectedBlockchain(
                              e,
                              BlockchainFilterType.destination,
                            )
                          }>
                          <CloseIcon
                            size="10px"
                            className="text-neutral-400 hover:text-hoverIcon"
                          />
                        </button>
                        <span className="text-neutral-400 mx-10">|</span>
                      </>
                    )}
                    <ChevronRightIcon />
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-35">
              <div className="text-18 font-medium mb-5">Break down by</div>
              <div>
                {breakDownOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full flex items-center justify-start rounded-micro px-[2px] py-5 mb-5 hover:bg-hoverBackground"
                    type="button"
                    onClick={() =>
                      setFilter((prevState) => ({
                        ...prevState,
                        breakDownBy: option.value,
                      }))
                    }>
                    <input
                      className="w-[16px] h-[16px] relative mr-5"
                      type="radio"
                      checked={!!breakDownBy && breakDownBy === option.value}
                    />
                    <div className="text-14">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Button
              disabled={!hasChange}
              onClick={() => onApply(filter)}
              className={`!text-18 !py-10 !w-full ${
                !hasChange ? '!bg-neutral-800' : '!bg-primary-600 '
              } `}>
              Apply
            </Button>
          </div>
        </div>
      )}

      {showBlockchainFilter && (
        <BlockchainFilter
          onSelect={handleSelectedBlockchain}
          selectedBlockchain={selectedBlockchain}
          blockchains={blockchains}
        />
      )}
    </Modal>
  );
}

export default ModalFilter;
