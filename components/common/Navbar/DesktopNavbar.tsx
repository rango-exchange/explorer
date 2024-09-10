import { useState } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import coloredLogo from 'public/logo.svg';
import rangoLogo from 'public/logo-with-text.svg';
import Menu from './Menu';
import { DeviceProps } from './Navbar.type';
import SearchInput from '../SearchBox/SearchInput';

function DesktopNavbar(props: DeviceProps) {
  const { links, renderChildren, theme, className, hasSearchInput } = props;
  const [showSubMenu, setShowSubMenu] = useState<number>(0);

  return (
    <div
      className={
        'py-30 relative z-50 hidden h-full w-full items-center justify-between font-medium md:flex md:text-[1.35vw]' +
        className
      }
      onMouseLeave={() => setShowSubMenu(0)}>
      {renderChildren ? (
        <>
          <div className="flex justify-center	items-center gap-9">
            <Link className="relative w-[3.8rem] md:w-[7.7rem]" href="/">
              <Image
                src={theme === 'dark' ? coloredLogo : rangoLogo}
                alt="Rango logo"
                layout="responsive"
              />
            </Link>
            {hasSearchInput && (
              <div className="w-[310px]">
                <SearchInput
                  className="md:!text-14 placeholder:!text-12"
                  roundedFull
                  hasSubmitButton={false}
                />
              </div>
            )}
          </div>

          <nav>
            <ul className="flex flex-row items-center text-22">
              {links.map((link, index) => (
                <li
                  className={`text-18 font-medium hover:text-secondary-500 
                  ${index !== links.length - 1 ? 'mr-60' : ''}
                   ${
                     theme === 'dark'
                       ? 'text-primary-500'
                       : 'text-baseForeground'
                   } leading-snug ${
                     showSubMenu === link.id ? 'text-secondary-500' : ''
                   }`}
                  key={index}
                  onMouseOver={() => setShowSubMenu(link.id)}>
                  {link.type === 'link' ? (
                    <Link
                      rel={link.openInNewTab ? 'noreferrer' : 'none'}
                      target={link.openInNewTab ? '_blank' : '_self'}
                      href={link.location}>
                      {link.title}
                    </Link>
                  ) : (
                    <Menu
                      showSubMenu={showSubMenu === link.id}
                      title={link.title}
                      subMenu={link.subMenu}
                      theme={theme}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}

export default DesktopNavbar;
