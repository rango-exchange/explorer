import React from 'react';
import { columns } from './SwapDetail.helper';
import { PropsType } from './SwapDetail.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

function SwapDetailSummary(props: PropsType) {
  const { details, id } = props;
  const { from, to } = details;
  return (
    <div className="w-full bg-baseForeground p-35 rounded-normal">
      <h1 className="text-28 font-semibold text-primary-500">Swap Details</h1>
      <p className="text-22 text-primary-500 pt-25">
        {`Swap from ${from.symbol} (on ${from.blockchain}) to ${to.symbol} (on ${to.blockchain})`}
      </p>
      <p className="pt-15 flex items-center">
        <span className="text-16 text-primary-500 font-medium">
          Request ID :
        </span>
        <span className="text-18 text-neutral-400 mx-5">{id}</span>
        <ButtonCopyIcon text={id} />
      </p>
      <div className="pt-35 px-20">
        {columns.map((col) => {
          const DetailValueComponent = col.component;
          const { title, id } = col;
          return (
            <>
              <div key={`row-${id}`} className="grid grid-cols-5">
                <div className="text-16 font-medium p-18 pl-0 col-span-2 text-primary-500 flex items-center">
                  {`${title} : `}
                </div>
                {DetailValueComponent && (
                  <DetailValueComponent column={col} details={details} />
                )}
              </div>
              {title !== 'Initiation Date And Time' && (
                <div className="h-[0.5px] w-full bg-neutral-300"></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SwapDetailSummary;
