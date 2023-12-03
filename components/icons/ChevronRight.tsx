import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgChevronRight(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g id="Chevron-right">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.44239 3.08171C5.33344 3.19065 5.33344 3.36729 5.44239 3.47623L9.96616 8L5.44239 12.5238C5.33344 12.6327 5.33344 12.8093 5.44239 12.9183C5.55133 13.0272 5.72797 13.0272 5.83691 12.9183L10.5579 8.19726C10.6669 8.08832 10.6669 7.91168 10.5579 7.80274L5.83691 3.08171C5.72797 2.97276 5.55133 2.97276 5.44239 3.08171Z"
          fill="#A2A2A2"
        />
      </g>
    </svg>,
  );
}
export default SvgChevronRight;
