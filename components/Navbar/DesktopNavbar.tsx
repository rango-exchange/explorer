import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import coloredLogo from 'public/logo.svg';
import rangoLogo from 'public/logo-with-text.svg';
import Menu from './Menu';
import { DeviceProps } from './Navbar.type';

function DesktopNavbar(props: DeviceProps) {
  const [showSubMenu, setShowSubMenu] = useState<number>(0);

  return (
    <div
      className={
        'py-30 relative z-50 hidden h-full w-full items-center justify-between font-medium xl:flex xl:text-[1.35vw]' +
        props.className
      }
      onMouseLeave={() => setShowSubMenu(0)}>
      {props.renderChildren ? (
        <>
          <Link className="relative w-[3.8rem] lg:w-[7.7rem]" href="/">
            <Image
              src={props.theme === 'dark' ? coloredLogo : rangoLogo}
              alt="Rango logo"
              layout="responsive"
            />
          </Link>

          <nav>
            <ul className="flex flex-row items-center text-lg">
              {props.links.map((link, index) => (
                <li
                  className={`mr-11 text-md font-medium hover:text-secondary-500 ${
                    props.theme === 'dark'
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
