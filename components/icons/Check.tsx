import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgCheck(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2992 2.67545C16.5669 2.94324 16.5669 3.37741 16.2992 3.6452L6.88851 13.0558C6.26367 13.6807 5.25061 13.6807 4.62577 13.0558L0.700841 9.13091C0.433053 8.86312 0.433053 8.42895 0.700841 8.16117C0.968629 7.89338 1.4028 7.89338 1.67059 8.16117L5.59552 12.0861C5.68478 12.1754 5.8295 12.1754 5.91877 12.0861L15.3294 2.67545C15.5972 2.40766 16.0314 2.40766 16.2992 2.67545Z"
        fill="#2284ED"
      />
    </svg>,
  );
}
export default SvgCheck;
