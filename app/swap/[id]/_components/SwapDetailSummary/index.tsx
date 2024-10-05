import React from 'react';
import { DesktopColumns, mobileColumns } from './SwapDetail.helper';
import { PropsType } from './SwapDetail.type';
import ButtonCopyIcon from 'components/common/ButtonCopyIcon';

function SwapDetailSummary(props: PropsType) {
  const { details, id } = props;
  const { from, to } = details;

  return (
    <div className="w-full bg-baseForeground px-15 py-20 md:p-35 rounded-soft md:rounded-normal">
      <h1 className="text-14 md:text-28 font-semibold text-primary-500">
        Swap Details
      </h1>
      <p className="text-14 md:text-22 text-primary-500 pt-15 md:pt-25">
        {`Swap from ${from.symbol} (on ${from?.blockchainData?.shortName}) to ${to.symbol} (on ${to?.blockchainData?.shortName})`}
      </p>
      <div className="pt-5 md:pt-15 flex md:items-center flex-col md:flex-row">
        <span className="text-12 md:text-16 text-primary-500 font-medium">
          Request ID :
        </span>
        <div className="flex items-center pt-5 md:pt-0">
          <span className="text-4 md:hidden md:text-18 text-neutral-400 mr-5 md:mx-5">
            {`${id.slice(0, 20)}...`}
          </span>
          <span className="text-4 hidden md:inline-block md:text-18 text-neutral-400 mr-5 md:mx-5">
            {id}
          </span>
          <ButtonCopyIcon text={id} />
        </div>
      </div>
      <div className="md:hidden h-[0.5px] mt-10 w-full bg-neutral-300"></div>
      <div className="md:hidden">
        {mobileColumns.map((col) => {
          const DetailValueComponent = col.component;
          return (
            DetailValueComponent && (
              <DetailValueComponent
                key={col.title}
                column={col}
                details={details}
              />
            )
          );
        })}
      </div>
      <div className="hidden md:block pt-35 px-20">
        {DesktopColumns.map((col, index) => {
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
              {index !== DesktopColumns.length - 1 && (
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
