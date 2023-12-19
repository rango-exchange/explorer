import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgPrevPage(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g id="Chevron-Left">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5577 3.08171C10.6667 3.19065 10.6667 3.36729 10.5577 3.47623L6.03397 8L10.5577 12.5238C10.6667 12.6327 10.6667 12.8093 10.5577 12.9183C10.4488 13.0272 10.2722 13.0272 10.1632 12.9183L5.44218 8.19726C5.33324 8.08832 5.33324 7.91168 5.44218 7.80274L10.1632 3.08171C10.2722 2.97276 10.4488 2.97276 10.5577 3.08171Z"
          fill="currentColor"
        />
      </g>
    </svg>,
  );
}
export default SvgPrevPage;
