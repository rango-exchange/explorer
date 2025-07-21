import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgFilter(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.88025 4H17.1171C17.9713 4 18.6654 4.69403 18.6654 5.54821V7.25659C18.6654 7.88388 18.2783 8.65799 17.8913 9.04505L14.5546 11.9947C14.0875 12.3817 13.7805 13.1558 13.7805 13.7831V17.1198C13.7805 17.5869 13.4735 18.2009 13.0865 18.4411L12.0054 19.1218C10.991 19.7491 9.60297 19.0417 9.60297 17.8005V13.6897C9.60297 13.1425 9.29599 12.4484 8.97567 12.0614L6.02606 8.95162C5.639 8.57791 5.33203 7.87054 5.33203 7.4034V5.6283C5.33203 4.69403 6.02606 4 6.88025 4Z"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  );
}
export default SvgFilter;
