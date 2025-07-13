import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgFail(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Status Icons">
        <rect width={20} height={20} rx={10} fill="#FFD7D7" />
        <path
          id="icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99969 3.42407C6.36982 3.42407 3.42383 6.37006 3.42383 9.99994C3.42383 13.6298 6.36982 16.5758 9.99969 16.5758C13.6296 16.5758 16.5756 13.6298 16.5756 9.99994C16.5756 6.37006 13.6296 3.42407 9.99969 3.42407ZM9.34211 13.2879V11.9727H10.6573V13.2879H9.34211ZM9.34211 6.71201V10.6575H10.6573V6.71201H9.34211Z"
          fill="#FF3B3B"
        />
      </g>
    </svg>,
  );
}
export default SvgFail;
