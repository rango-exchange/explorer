import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgChevronDown(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Chevron-Down">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.91829 2.44336C9.80935 2.33442 9.63271 2.33442 9.52377 2.44336L5 6.96713L0.476233 2.44336C0.367288 2.33442 0.190653 2.33442 0.0817089 2.44336C-0.027236 2.55231 -0.027236 2.72894 0.0817089 2.83789L4.80274 7.55892C4.91168 7.66786 5.08832 7.66786 5.19726 7.55892L9.91829 2.83789C10.0272 2.72894 10.0272 2.55231 9.91829 2.44336Z"
          fill="currentColor"
        />
      </g>
    </svg>,
  );
}
export default SvgChevronDown;
