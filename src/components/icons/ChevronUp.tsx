import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgChevronUp(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Chevron-Up">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.08171 8.55664C1.19065 8.66558 1.36729 8.66558 1.47623 8.55664L6 4.03287L10.5238 8.55664C10.6327 8.66558 10.8093 8.66558 10.9183 8.55664C11.0272 8.44769 11.0272 8.27106 10.9183 8.16211L6.19726 3.44108C6.08832 3.33214 5.91168 3.33214 5.80274 3.44108L1.08171 8.16211C0.972764 8.27106 0.972764 8.44769 1.08171 8.55664Z"
          fill="currentColor"
        />
      </g>
    </svg>,
  );
}
export default SvgChevronUp;
