import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import coloredLogo from 'public/logo-with-text.svg';
import DefispotLogo from 'public/logo-with-text.svg';
import ArrowUpRight from 'public/img/arrow-up-right.svg';
import Menu from './Menu';
import { DeviceProps } from './Navbar.type';

function DesktopNavbar(props: DeviceProps) {
  const { links, renderChildren, theme, className } = props;
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
          <Link className="relative w-[3.8rem] md:w-[7.7rem]" href="/">
            <Image
              src={theme === 'dark' ? coloredLogo : DefispotLogo}
              alt="Rango logo"
              layout="responsive"
            />
          </Link>

          <nav
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ul
              className="flex flex-row items-center text-22"
              style={{ listStyle: 'none', padding: 0 }}>
              {links.map((link, index) => (
                <li
                  className={`text-18 font-medium px-4 py-2 border: 2px solid transparent; border-radius: 1rem; transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        ${index !== links.length - 1 ? 'mr-60' : ''}
        ${
          theme === 'dark'
            ? 'text-primary-500 hover:border-primary-500'
            : 'text-baseForeground hover:border-secondary-500'
        } leading-snug ${
          showSubMenu === link.id
            ? 'text-secondary-500 border-secondary-500'
            : ''
        }`}
                  key={index}
                  onMouseOver={() => setShowSubMenu(link.id)}
                  onMouseOut={() => setShowSubMenu(0)}
                  style={{
                    margin: '0 10px',
                    display: 'flex', // Changed to flex to align items side by side
                    alignItems: 'center', // Center items vertically
                    transition: 'all 0.3s ease',
                    backgroundColor: '#666',
                    borderRadius:
                      index === 0
                        ? '2rem .5rem .5rem 2rem'
                        : index === links.length - 1
                          ? '.5rem 2rem 2rem .5rem'
                          : '.5rem .5rem .5rem .5rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transform: showSubMenu === link.id ? 'scale(1.04)' : 'none',
                    color: '#fff',
                  }}>
                  {link.type === 'link' ? (
                    <a
                      rel={link.openInNewTab ? 'noreferrer' : 'none'}
                      target={link.openInNewTab ? '_blank' : '_self'}
                      href={link.location}
                      style={{ textDecoration: 'none', color: 'inherit' }}>
                      {link.title}
                    </a>
                  ) : (
                    <Menu
                      showSubMenu={showSubMenu === link.id}
                      title={link.title}
                      subMenu={link.subMenu}
                      theme={theme}
                    />
                  )}
                  <Image
                    src={ArrowUpRight}
                    alt="Link"
                    style={{ marginLeft: '8px', width: '10px', height: '10px' }}
                  />
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
