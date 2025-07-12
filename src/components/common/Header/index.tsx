'use client';

import DesktopHeader from './DesktopHeader';
import { links } from './Header.helper';
import MobileHeader from './MobileHeader';
import { HeaderProps } from './Header';
import { Media } from '../media';

function Header(props: HeaderProps) {
  const { theme } = props;

  return (
    <header
      className={`flex w-full ${
        theme === 'dark' ? 'bg-transparent' : 'bg-baseBackground'
      } items-center justify-center`}>
      <div
        className={
          'container flex w-full  items-center justify-center px-25  text-baseForeground md:md-0'
        }>
        <Media between={['xs', 'md']}>
          {(className, renderChildren) => (
            <MobileHeader
              theme={theme}
              renderChildren={renderChildren}
              links={links}
              className={className}
            />
          )}
        </Media>
        <Media greaterThanOrEqual="md">
          {(className, renderChildren) => (
            <DesktopHeader
              theme={theme}
              className={className}
              renderChildren={renderChildren}
              links={links}
            />
          )}
        </Media>
      </div>
    </header>
  );
}

export default Header;
