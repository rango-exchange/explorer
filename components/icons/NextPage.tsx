import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgNextPage(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Chevron-right">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.44214 3.08171C5.3332 3.19065 5.3332 3.36729 5.44214 3.47623L9.96591 8L5.44214 12.5238C5.3332 12.6327 5.3332 12.8093 5.44214 12.9183C5.55109 13.0272 5.72772 13.0272 5.83667 12.9183L10.5577 8.19726C10.6666 8.08832 10.6666 7.91168 10.5577 7.80274L5.83667 3.08171C5.72772 2.97276 5.55109 2.97276 5.44214 3.08171Z"
          fill="currentColor"
        />
      </g>
    </svg>,
  );
}
export default SvgNextPage;
