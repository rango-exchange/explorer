import type { PropsWithChildren } from 'react';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PropTypes } from './modal.types';
import { CloseIcon } from 'components/icons';

const CLOSED_DELAY = 400;
const OPEN_DELAY = 100;
export function Modal(props: PropsWithChildren<PropTypes>) {
  const { open, onClose, dismissible = true, children, prefix, title } = props;
  const [active, setActive] = useState(false);
  const [isMount, setIsMount] = useState(false);

  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && dismissible) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      setIsMount(true);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setActive(true);
      }, OPEN_DELAY);
    } else {
      setActive(false);
      setTimeout(() => {
        setIsMount(false);
        document.body.style.overflow = 'unset';
      }, CLOSED_DELAY);
    }
  }, [open]);

  return (
    <>
      {isMount &&
        createPortal(
          <div
            onClick={handleBackDropClick}
            className="fixed bg-overlay top-0 bottom-0 left-0 items-end justify-end w-full h-full z-10 flex overflow-hidden	transition-all">
            <div
              className={`bg-baseForeground w-full rounded-t-large h-[75%] animate-modal ${
                active ? 'animate-mount-modal' : ''
              }`}>
              <div className="flex px-20 py-10 z-20 justify-center items-center">
                {prefix && (
                  <div className="flex items-center shrink-0">{prefix}</div>
                )}
                <div className="text-16 grow shrink font-medium text-center">
                  {title}
                </div>
                {dismissible && (
                  <button type="button" className="shrink-0" onClick={onClose}>
                    <CloseIcon size="12px" className="text-neutral-400" />
                  </button>
                )}
              </div>
              <div className="w-full h-[calc(100%-44px)] px-20 py-10">
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
