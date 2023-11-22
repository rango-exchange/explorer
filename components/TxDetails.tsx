/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { DetailsType } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CapitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { SecondsTohms } from 'utils/secondsTohms';
import Image from 'next/image';
import copy from '../public/img/copy.svg';
import { CopyText } from '../utils/copyText';

dayjs.extend(utc);

interface PropsType {
  details: DetailsType;
}
interface DetailPropType {
  title: string;
  value: string;
  className?: string;
  image?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  hasCopyButton?: boolean;
}
const Detail = ({
  title,
  value,
  className,
  image,
  onClick,
  hasCopyButton,
}: DetailPropType): JSX.Element => (
  <div className="flex items-center border-b border-b-neutral-300 py-3.5 lg:py-5">
    <p className="whitespace-nowrap flex-1 text-12 lg:text-base">{title}</p>
    <div className={`flex-1 flex items-center mr-1 ${className || ''}`}>
      {image && (
        <img className="w-3 h-3 lg:w-8 lg:h-8 mr-1" src={image} alt={value} />
      )}
      <button
        className={`font-normal text-12 lg:text-base lg:font-bold ${
          className || ''
        }`}
        onClick={onClick}>
        {value}
      </button>
      {hasCopyButton && (
        <button
          onClick={() => CopyText(value)}
          className="group relative cursor-pointer">
          <Image
            src={copy}
            alt="copy_to_clipboard"
            sizes="(max-width: 768px) 25px,
              (max-width: 1200px) 25px,
              25px"
          />
        </button>
      )}
    </div>
  </div>
);
const TxDetails: React.FC<PropsType> = ({ details }) => {
  return (
    <div className="w-full bg-neutral-100 p-3 rounded-lg lg:p-10">
      <h3 className="text-16 font-bold lg:text-28 lg:mb-5 mb-3 border-ry">
        Swap Details
      </h3>
      <Detail
        title="Swap Status:"
        value={CapitalizeFirstLetter(details.status)}
        className={`text-${details.status}`}
      />
      <Detail
        title="Source Address:"
        value={details.sourceWallet}
        hasCopyButton
        className="text-primary truncate cursor-pointer"
        onClick={() => window.open(details.sourceWalletAddress, '_blank')}
      />
      <Detail
        title="Source Chain:"
        value={details.from.blockchain}
        image={details.from.blockchainLogo}
      />
      <Detail
        title="Destination Address:"
        hasCopyButton
        value={details.destinationWallet}
        className="text-primary truncate cursor-pointer"
        onClick={() => window.open(details.destinationWalletAddress, '_blank')}
      />
      <Detail
        title="Destination Chain:"
        value={details.to.blockchain}
        image={details.to.blockchainLogo}
      />
      <Detail
        title="Estimated Duration:"
        value={SecondsTohms(details.estimatedTimeInSeconds)}
      />
      <Detail
        title="Initiation Date And Time:"
        value={dayjs
          .utc(details.creationDate)
          .local()
          .format('DD MMMM YYYY, HH:MM')
          .toString()}
      />
    </div>
  );
};

export default TxDetails;
