import React from 'react';
import { columns } from './SwapDetail.helper';
import { PropsType } from './SwapDetail.type';
import Image from 'next/image';
import { CopyText } from 'utils/copyText';
import CopyIcon from 'public/icons/copy.svg';

function SwapDetailSummary(props: PropsType) {
  const { details, id } = props;
  return (
    <div className="w-full bg-baseForeground p-35 rounded-normal">
      <h1 className="text-28 font-semibold text-primary-500">Swap Details</h1>
      <p className="text-22 text-primary-500 pt-25">
        {`Swap from ${details.from.symbol} (on ${details.from.blockchain}) to ${details.to.symbol} (on ${details.to.blockchain})`}
      </p>
      <p className="pt-15 flex items-center">
        <span className="text-16 text-primary-500 font-medium">
          Request ID :
        </span>
        <span className="text-18 text-neutral-400">{id}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            CopyText(id);
          }}
          className="ml-5 cursor-pointer">
          <Image
            width={16}
            height={16}
            src={CopyIcon}
            alt="copy_to_clipboard"
          />
        </button>
      </p>
      <div className="py-35 px-20">
        {columns.map((col) => {
          const DetailValueComponent = col.component;
          const { title, id } = col;
          return (
            <div key={`column-${id}`} className="grid grid-cols-5">
              <div className="text-16 font-medium p-16 pl-0 col-span-2 text-primary-500 flex items-center">
                {`${title} : `}
              </div>
              {DetailValueComponent && (
                <DetailValueComponent column={col} details={details} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SwapDetailSummary;
