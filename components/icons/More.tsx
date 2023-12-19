import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgMore(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 2 11" xmlns="http://www.w3.org/2000/svg">
      <g id="Group">
        <path
          id="Vector"
          d="M1 2.5C1.55228 2.5 2 2.05228 2 1.5C2 0.947715 1.55228 0.5 1 0.5C0.447715 0.5 0 0.947715 0 1.5C0 2.05228 0.447715 2.5 1 2.5Z"
          fill="currentColor"
        />
        <path
          id="Vector_2"
          d="M1 6.5C1.55228 6.5 2 6.05228 2 5.5C2 4.94772 1.55228 4.5 1 4.5C0.447715 4.5 0 4.94772 0 5.5C0 6.05228 0.447715 6.5 1 6.5Z"
          fill="currentColor"
        />
        <path
          id="Vector_3"
          d="M1 10.5C1.55228 10.5 2 10.0523 2 9.5C2 8.94772 1.55228 8.5 1 8.5C0.447715 8.5 0 8.94772 0 9.5C0 10.0523 0.447715 10.5 1 10.5Z"
          fill="currentColor"
        />
      </g>
    </svg>,
  );
}
export default SvgMore;
