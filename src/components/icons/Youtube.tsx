import React, { createElement } from 'react';
import type { SvgIconPropsWithChildren } from '../common/SvgIcon';
import { SvgIcon } from '../common/SvgIcon';
function SvgYoutube(props: SvgIconPropsWithChildren) {
  return createElement(
    SvgIcon,
    props,
    <svg viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        id="Vector"
        d="M15.5534 2.60224C15.4055 1.78585 14.7007 1.19132 13.8829 1.00572C12.6591 0.746155 10.3941 0.560547 7.94345 0.560547C5.49429 0.560547 3.19304 0.746155 1.96774 1.00572C1.15135 1.19132 0.44517 1.74815 0.297263 2.60224C0.147907 3.53028 0 4.82953 0 6.50001C0 8.17048 0.147907 9.46974 0.333515 10.3978C0.482871 11.2142 1.1876 11.8087 2.00399 11.9943C3.30324 12.2539 5.53054 12.4395 7.98115 12.4395C10.4318 12.4395 12.6591 12.2539 13.9583 11.9943C14.7747 11.8087 15.4794 11.2519 15.6288 10.3978C15.7767 9.46974 15.9623 8.13278 16 6.50001C15.9246 4.82953 15.739 3.53028 15.5534 2.60224ZM5.93946 9.09852V3.90149L10.468 6.50001L5.93946 9.09852Z"
        fill="currentColor"
      />
    </svg>,
  );
}
export default SvgYoutube;
