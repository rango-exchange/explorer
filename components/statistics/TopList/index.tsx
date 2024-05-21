/* eslint-disable @next/next/no-img-element */
import { compactNumberFormat } from 'utils/amountConverter';
import { TopListItemProps } from './TopList.type';
import React from 'react';
import { NextIcon } from 'components/icons';
import { TOP_LIST_NUMBER_TO_SHOW } from './TopList.helper';

function TopList(props: TopListItemProps) {
  const {
    title,
    description,
    topList,
    type,
    blockchainDataMap,
    isVolume = false,
  } = props;

  return (
    <div className="w-full h-[330px] md:h-[350px] bg-baseForeground py-15 px-20 md:p-25 pr-0 rounded-soft md:rounded-normal">
      <div className="text-18 md:text-22 font-semibold text-primary-500">
        {title}
      </div>
      <div className="text-10 text-12 font-medium text-neutral-800 mt-2 md:mt-5">
        {description}
      </div>
      {topList && (
        <div className="w-full h-[230px] mt-15 md:mt-25 overflow-y-scroll pr-20 md:pr-25">
          {type === 'blockchain' &&
            topList.slice(0, TOP_LIST_NUMBER_TO_SHOW).map((topItem) => {
              const { key, value } = topItem;
              const blockchainData = blockchainDataMap.get(key);
              if (!value) return;
              return (
                <React.Fragment key={key}>
                  <div className="flex items-center justify-between py-[8px] md:py-10">
                    <div className="flex items-center">
                      <img
                        className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] rounded-full mr-5"
                        src={blockchainData?.logo}
                        title={blockchainData?.shortName}
                        alt={blockchainData?.shortName}
                      />
                      <span className="text-12 md:text-14 text-neutral-400">
                        {blockchainData?.shortName}
                      </span>
                    </div>
                    <div className="text-14 md:text-16 font-medium">
                      {isVolume && '$'}
                      {compactNumberFormat(value)}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-neutral-300"></div>
                </React.Fragment>
              );
            })}

          {type === 'path' &&
            topList.slice(0, TOP_LIST_NUMBER_TO_SHOW).map((topItem) => {
              const { key, value } = topItem;
              const { source, destination } = key;
              const sourceBlockchain = blockchainDataMap.get(source);
              const destinationBlockchainData =
                blockchainDataMap.get(destination);
              if (!value) return;
              return (
                <React.Fragment key={`${source}-${destination}`}>
                  <div className="flex items-center justify-between py-[8px] md:py-10">
                    <div className="flex items-center">
                      <img
                        className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] rounded-full mr-5"
                        src={sourceBlockchain?.logo}
                        title={sourceBlockchain?.shortName}
                        alt={sourceBlockchain?.shortName}
                      />
                      <span className="text-12 md:text-14 text-neutral-400">
                        {sourceBlockchain?.shortName}
                      </span>
                      <NextIcon className="mx-5 text-neutral-400" />
                      <img
                        className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] mr-5"
                        src={destinationBlockchainData?.logo}
                        title={destinationBlockchainData?.shortName}
                        alt={destinationBlockchainData?.shortName}
                      />
                      <span className="text-12 md:text-14 text-neutral-400">
                        {destinationBlockchainData?.shortName}
                      </span>
                    </div>
                    <div className="text-14 md:text-16 font-medium">
                      {isVolume && '$'}
                      {compactNumberFormat(value)}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-neutral-300"></div>
                </React.Fragment>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default TopList;
