import { CopyIcon, CheckIcon } from 'components/icons';
import { PropsType } from './ButtonCopyIcon.type';
import { CopyText } from 'utils/copyText';
import { useState } from 'react';
import Tooltip from '../Tooltip';

function ButtonCopyIcon(props: PropsType) {
  const {
    text,
    className,
    hasTooltip = true,
    tooltipText = 'Copy To Clipboard',
    copiedTooltipText = 'Copied To Clipboard',
  } = props;
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (text && !copied) {
      CopyText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <button
      className={`flex items-center ${className || ''}`}
      onClick={handleClick}>
      {copied ? (
        <Tooltip label={copiedTooltipText}>
          <CheckIcon />
        </Tooltip>
      ) : (
        <>
          {hasTooltip ? (
            <Tooltip label={tooltipText}>
              <CopyIcon className="text-neutral-400 hover:text-hoverIcon" />
            </Tooltip>
          ) : (
            <CopyIcon className="text-neutral-400 hover:text-hoverIcon" />
          )}
        </>
      )}
    </button>
  );
}

export default ButtonCopyIcon;
