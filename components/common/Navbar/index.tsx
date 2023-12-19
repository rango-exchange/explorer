import { Media } from '../media';
import DesktopNavbar from './DesktopNavbar';
import { links } from './Navbar.helper';
import MobileNavbar from './MobileNavbar';
import { NavbarProps } from './Navbar.type';

function Navbar(props: NavbarProps) {
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
            <MobileNavbar
              theme={theme}
              renderChildren={renderChildren}
              links={links}
              className={className}
            />
          )}
        </Media>
        <Media greaterThanOrEqual="md">
          {(className, renderChildren) => (
            <DesktopNavbar
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

export default Navbar;
