import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgInfo(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icons/32 px/info/Default">
        <g id="Group 1000007333">
          <path
            id="Vector"
            d="M5.99338 5.0772C5.87121 5.07915 5.7547 5.12927 5.66952 5.21677C5.58433 5.30417 5.53746 5.42176 5.53911 5.54368V8.76442C5.53736 8.88756 5.58526 9.00629 5.67199 9.09399C5.75873 9.18169 5.87709 9.23099 6.0006 9.23099C6.12421 9.23099 6.24257 9.1817 6.32931 9.09399C6.41605 9.00628 6.46384 8.88756 6.46209 8.76442V5.54368C6.46384 5.41931 6.41502 5.29956 6.32663 5.21164C6.23835 5.12383 6.11813 5.07525 5.99338 5.0772Z"
            fill="currentColor"
          />
          <path
            id="Vector_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.46214 3.69201C6.46214 3.94688 6.25548 4.15355 6.0006 4.15355C5.74572 4.15355 5.53906 3.94688 5.53906 3.69201C5.53906 3.43713 5.74572 3.23047 6.0006 3.23047C6.25548 3.23047 6.46214 3.43713 6.46214 3.69201Z"
            fill="currentColor"
          />
          <path
            id="Vector_3"
            d="M6 0C2.69143 0 0 2.69143 0 6C0 9.30857 2.69143 12 6 12C9.30857 12 12 9.30857 12 6C12 2.69143 9.30857 0 6 0ZM6 0.857143C8.84547 0.857143 11.1429 3.15458 11.1429 6C11.1429 8.84542 8.84542 11.1429 6 11.1429C3.15458 11.1429 0.857143 8.84542 0.857143 6C0.857143 3.15458 3.15458 0.857143 6 0.857143Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>,
  );
}
export default SvgInfo;
