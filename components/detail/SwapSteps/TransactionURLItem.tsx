import React, { useEffect, useRef, useState } from 'react';
import IconStatus from 'components/common/IconStatus';
import { TransactionURLItemProps } from './SwapSteps.type';
import { CopyIcon, InfoIcon, LinkIcon, MoreIcon } from 'components/icons';
import { CopyText } from 'utils/copyText';

function TransactionURLItem(props: TransactionURLItemProps) {
  const { description, url, transactionStatus } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleCopy = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    text: string,
  ) => {
    e.stopPropagation();
    if (text) {
      CopyText(text);
      setOpen(false);
    }
  };

  const handleLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string,
  ) => {
    if (e) e.stopPropagation();
    setOpen(false);
    if (value) window.open(value, '_blank');
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) e.stopPropagation();
    setOpen(open ? false : true);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref?.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="mb-5 md:mb-10 bg-neutral-900 p-5 md:px-10 md:py-12 rounded-micro flex items-center justify-between">
      <div className="flex items-center">
        <IconStatus status={transactionStatus} />
        <span className="pl-5 text-10 md:text-14 text-primary-500">
          {description || 'Swap transaction'}
        </span>
      </div>
      <div className="relative">
        <button
          onClick={handleOpen}
          className="hover:bg-hoverBackgroundIcon rounded-full flex items-center justify-center w-[1rem] h-[1rem]">
          <MoreIcon size="0.6rem" className="text-neutral-400" />
        </button>
        {open && (
          <div
            ref={ref}
            style={{
              boxShadow: '0px 5px 20px 0px rgba(130, 130, 130, 0.20)',
            }}
            className="py-5 z-10 rounded-micro bg-baseForeground absolute w-[124px] bottom-[-130px] right-[5px] flex flex-col">
            <button
              onClick={(e) => handleCopy(e, url)}
              className="flex items-center py-10 px-15 hover:bg-surfacesBackground ">
              <CopyIcon className="text-neutral-400 mr-5" />
              <span className="text-12 text-primary-500">Copy</span>
            </button>
            <button
              onClick={(e) => handleLink(e, url)}
              className="flex items-center py-10 px-15 hover:bg-surfacesBackground ">
              <LinkIcon className="text-neutral-400 mr-5" />
              <span className="text-12 text-primary-500">Txn Hash</span>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center py-10 px-15 hover:bg-surfacesBackground ">
              <InfoIcon className="text-neutral-400 mr-5" />
              <span className="text-12 text-primary-500">Show Details</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionURLItem;
