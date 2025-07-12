import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgNext(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Next">
        <g id="Group">
          <path
            id="Arrow 1 (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0287 5.34362L15.8693 8.18419C16.0436 8.3585 16.0436 8.64112 15.8693 8.81543L13.0287 11.656C12.8544 11.8303 12.5718 11.8303 12.3975 11.656C12.2232 11.4817 12.2232 11.1991 12.3975 11.0248L14.4761 8.94616H0.446352C0.199839 8.94616 0 8.74632 0 8.49981C0 8.25329 0.199839 8.05346 0.446352 8.05346H14.4761L12.3975 5.97486C12.2232 5.80055 12.2232 5.51794 12.3975 5.34362C12.5718 5.16931 12.8544 5.16931 13.0287 5.34362Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>,
  );
}
export default SvgNext;
