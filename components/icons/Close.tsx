import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgClose(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <g id="Close" clipPath="url(#clip0_7416_19845)">
        <path
          id="Icon (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.4592 -4.45952C18.713 -4.20568 18.713 -3.79412 18.4592 -3.54028L7.91883 7.0001L18.4592 17.5405C18.713 17.7943 18.713 18.2059 18.4592 18.4597C18.2054 18.7136 17.7938 18.7136 17.54 18.4597L6.99959 7.91934L-3.54077 18.4597C-3.79461 18.7135 -4.20617 18.7135 -4.46001 18.4597C-4.71385 18.2059 -4.71385 17.7943 -4.46001 17.5405L6.08035 7.0001L-4.46001 -3.54026C-4.71385 -3.7941 -4.71385 -4.20566 -4.46001 -4.4595C-4.20617 -4.71334 -3.79461 -4.71334 -3.54077 -4.4595L6.99959 6.08086L17.54 -4.45952C17.7938 -4.71336 18.2054 -4.71336 18.4592 -4.45952Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_7416_19845">
          <rect width={14} height={14} fill="white" />
        </clipPath>
      </defs>
    </svg>,
  );
}
export default SvgClose;
