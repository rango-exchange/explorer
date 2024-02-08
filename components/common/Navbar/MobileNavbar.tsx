import Image from 'next/image';
import Link from 'next/link';
import coloredLogo from 'public/logo-with-text.svg';
import rangoLogo from 'public/logo-with-text.svg';
import { DeviceProps } from './Navbar.type';
import MobileMenu from './MobileMenu';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MobileNavbar(props: DeviceProps) {
  const { theme, renderChildren, links, className } = props;

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { pathname } = useRouter();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMenu]);

  return (
    <div
      className={
        'relative z-[200] flex h-full w-full items-center justify-between py-30 font-thin md:hidden md:text-[1.35vw]' +
        className
      }>
      {renderChildren ? (
        <>
          <Link href="/" className="relatives w-[4.75rem] ">
            <Image
              src={theme === 'dark' ? coloredLogo : rangoLogo}
              alt="Rango logo"
              layout="responsive"
            />
          </Link>

          <MobileMenu
            onClose={() => setShowMenu(false)}
            showMenu={showMenu}
            links={links}
          />

          <div className="flex h-full">
            <button
              className={`cursor-pointer focus:outline-none ${
                theme === 'dark' ? 'text-primary-500' : 'text-baseForeground'
              }`}
              onClick={setShowMenu.bind(null, !showMenu)}
              aria-label="Open the menu">
              <svg
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="h-6 w-6">
                <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z" />
              </svg>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MobileNavbar;
