import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import rangoLogo from 'public/logo.svg';
import { MobileMenuProps } from './Navbar.type';
import { useRouter } from 'next/router';

const CLOSED_DELAY = 300;
const OPEN_DELAY = 10;

function MobileMenu(props: MobileMenuProps) {
  const { links, showMenu, onClose } = props;
  const [showSubMenu, setShowSubMenu] = useState<number>(0);
  const { pathname } = useRouter();
  const [active, setActive] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (showMenu) {
      setIsMount(true);
      setTimeout(() => {
        setActive(true);
      }, OPEN_DELAY);
    } else {
      setActive(false);
      setTimeout(() => {
        setIsMount(false);
      }, CLOSED_DELAY);
    }
  }, [showMenu]);
  return (
    <>
      {isMount && (
        <>
          <div
            className="fixed top-0 left-0 h-full w-full bg-[#e6e6e6b3]"
            onClick={handleBackDropClick}
          />
          <div
            className={`fixed top-0 right-0 flex h-full w-10/12 flex-col items-center justify-between overflow-x-auto rounded-l-3xl bg-baseForeground px-5 pb-10  pt-[1.875rem] 
            animate-menu
            ${active ? 'animate-mount-menu' : ''}`}>
            <nav className="w-full">
              <div className="flex w-full items-center justify-between pb-6">
                <Link className="relative w-24" href="/">
                  <Image src={rangoLogo} alt="Rango logo" layout="responsive" />
                </Link>
                <div />
              </div>
              <ul className="flex h-full w-full flex-col text-lg text-sm font-medium text-primary-500">
                {links.map((link, index) => (
                  <>
                    <li key={index}>
                      {link.type === 'link' ? (
                        <Link
                          href={link.location}
                          target={link.openInNewTab ? '_blank' : '_self'}
                          rel={link.openInNewTab ? 'noreferrer' : 'none'}
                          className={`flex w-full items-center justify-between py-4 text-sm font-medium	 
                  ${
                    pathname === link.location
                      ? 'text-secondary-500'
                      : 'text-primary-500'
                  }`}>
                          <span>{link.title}</span>
                        </Link>
                      ) : (
                        <>
                          <div
                            className="flex items-center justify-between py-4 text-sm font-medium	text-primary-500"
                            onClick={() =>
                              showSubMenu === link.id
                                ? setShowSubMenu(0)
                                : setShowSubMenu(link.id)
                            }>
                            <p>{link.title}</p>
                            <div
                              className={`transform transition-all ${
                                showSubMenu === link.id
                                  ? 'rotate-180'
                                  : 'rotate-0'
                              }`}>
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill="currentcolor"
                                  fillRule="evenodd"
                                  d="M10.569 2.942a.279.279 0 0 0-.395 0L5.65 7.466 1.127 2.942a.279.279 0 1 0-.395.395l4.721 4.72a.279.279 0 0 0 .395 0l4.72-4.72a.279.279 0 0 0 0-.395Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>

                          <ul
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              showSubMenu === link.id
                                ? 'max-h-48'
                                : 'invisible max-h-0'
                            }`}>
                            {link.subMenu.map((item, index) => (
                              <li
                                className="flex items-center py-2.5 pl-2 text-xs text-neutral-400"
                                key={index}>
                                <Link
                                  href={item.location}
                                  target={
                                    item.openInNewTab ? '_blank' : '_self'
                                  }
                                  rel={
                                    item.openInNewTab ? 'noreferrer' : 'none'
                                  }
                                  className={`flex items-center hover:text-secondary-500 ${
                                    pathname === item.location
                                      ? 'text-secondary-500'
                                      : 'text-primary-500'
                                  }`}>
                                  <div
                                    className={`h-1 w-1 ${
                                      pathname === item.location
                                        ? 'bg-secondary-500'
                                        : 'bg-neutral-400'
                                    } mr-2	rounded-full`}
                                  />{' '}
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                    {index !== links.length - 1 && (
                      <hr className="w-full border-neutral-300 opacity-50" />
                    )}
                  </>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default MobileMenu;
