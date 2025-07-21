import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgSearch(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Search">
        <g id="Group">
          <path
            id="Path (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.2356 3.19453C9.739 0.697923 5.6912 0.697923 3.19459 3.19453C0.697984 5.69114 0.697984 9.73894 3.19459 12.2356C5.6912 14.7322 9.739 14.7322 12.2356 12.2356C14.7322 9.73894 14.7322 5.69114 12.2356 3.19453ZM12.817 2.61319C9.99928 -0.20448 5.43093 -0.20448 2.61326 2.61319C-0.204419 5.43087 -0.204419 9.99922 2.61326 12.8169C5.43093 15.6346 9.99928 15.6346 12.817 12.8169C15.6346 9.99922 15.6346 5.43087 12.817 2.61319Z"
            fill="currentColor"
          />
          <path
            id="Path (Stroke)_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.2317 12.2314C12.3923 12.0708 12.6525 12.0708 12.8131 12.2314L16.3799 15.7982C16.5404 15.9587 16.5404 16.219 16.3799 16.3795C16.2193 16.54 15.9591 16.54 15.7985 16.3795L12.2317 12.8127C12.0712 12.6522 12.0712 12.3919 12.2317 12.2314Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>,
  );
}
export default SvgSearch;
