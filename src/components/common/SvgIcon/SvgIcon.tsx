import type { SvgIconPropsWithChildren } from './SvgIcon.types';

import React from 'react';

export function SvgIcon(props: SvgIconPropsWithChildren) {
  const { size = '1em', color, children, className } = props;
  const originalSvgProps = children?.props;
  const commonProps = {
    ...originalSvgProps,
    width: size,
    height: size,
    color,
    className,
  };

  return <svg {...commonProps}>{children?.props.children}</svg>;
}
