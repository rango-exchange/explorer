/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { LegacyRef, useEffect, useRef, useState } from 'react'
import burger_menu from '../../public/img/burger-menu.svg'
import arrow_down from '../../public/img/arrow_down.svg'
import dashboard from '../../public/img/dashboard.svg'
import resource from '../../public/img/resource.svg'
import arrow_up from '../../public/img/arrow_up.svg'
import logo from '../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const links: Array<{ location: string, title: string, id: number }> = [
  {
    location: 'https://app.rango.exchange/',
    title: 'Rango App',
    id: 1
  },
  {
    location: 'https://docs.rango.exchange/integration-guide/overview',
    title: 'Rango SDK Doc',
    id: 2
  },
  {
    location: 'https://rango.exchange/docs/rango-whitepaper.pdf',
    title: 'White Paper',
    id: 3
  }
]

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenSubmenu, setIsOpenSubmenu] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement | undefined>()

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isOpen])

  const closeMenu = (): void => setIsOpen(false)
  return (
    <>
      <div className="relative" ref={menuRef as LegacyRef<HTMLDivElement>}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="active:bg-background  w-9 h-9 lg:w-12 lg:h-12 rounded-full flex justify-center items-center"
        >
          <Image
            className="lg:w-9 lg:h-9"
            src={burger_menu}
            alt="menu"
          />
        </button>
        <div
          className={`w-64 z-20 lg:border-t-2 rounded lg:border-t-primary pl-5 pt-5 pb-6 pr-14 left-0 right-auto lg:left-auto lg:right-0 top-0 bg-neutral-100 h-screen lg:h-fit lg:top-20 ${
            !isOpen ? 'hidden' : 'lg:absolute fixed'
          }`}
        >
          <Image
            className="lg:hidden mx-auto mb-12 mt-16"
            src={logo}
            width={96}
            alt="Rango logo"
          />
          <Link
            href="/"
            className="flex items-center font-semibold hover:text-primary text-sm lg:hidden mb-8"
            onClick={closeMenu}
          >
            <Image
              className="mr-3.5"
              src={dashboard}
              alt="dashboard Rango scanner"
            />
            Dashboard
          </Link>
          <div
            className="flex items-center justify-between"
            onClick={() => setIsOpenSubmenu(!isOpenSubmenu)}
          >
            <div className="flex items-center">
              <Image
                className="mr-3.5 lg:hidden"
                src={resource}
                alt="resource Rango scanner"
              />
              <p className="text-sm font-semibold lg:font-bold lg:text-base">
                Resources
              </p>
            </div>
            {isOpenSubmenu ? (
              <Image className="lg:hidden" src={arrow_up} alt="arrow up" />
            ) : (
              <Image className="lg:hidden" src={arrow_down} alt="arrow down" />
            )}
          </div>

          <hr className="my-2 hidden lg:block" />
          <div
            className={`mt-5 ml-9 lg:m-0 ${
              isOpenSubmenu ? 'block' : 'hidden'
            } lg:block`}
          >
            {links.map((link) => (
              <p key={`link-${link.id}`} className="text-xs pb-5 lg:text-base">
                <a
                  href={link.location}
                  target="_blank"
                  className="hover:text-primary" rel="noreferrer"
                >
                  {link.title}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`bg-neutral-900 w-screen h-screen ${
          isOpen ? 'fixed' : 'hidden'
        } top-0 z-10 bg-opacity-25 lg:hidden`}
      />
    </>
  )
}

export default Menu
