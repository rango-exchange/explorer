import { ChangeEvent, KeyboardEvent, useState } from 'react'
import search from '../../public/img/search.svg'
import clear from '../../public/img/clear.svg'
import logo from '../../public/img/logo.png'
import desktopLogo from '../../public/img/rango.svg'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'

interface PropsType {
  hasSearch?: boolean
}

const Navbar: React.FC<PropsType> = ({ hasSearch }: PropsType) => {
  const router = useRouter()
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      const query = (e.target as HTMLTextAreaElement).value
      setShowSearchInput(false)
      router.push({
        pathname: '/search',
        query: { query }
      })
    }
  }
  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
  }

  const handleOnClick = (): void => {
    router.push({
      pathname: '/search',
      query: { query }
    })
  }

  return (
    <header className="bg-neutral-100 flex-row-reverse sticky top-0 z-20 lg:flex-row justify-between  items-center flex px-5 py-2.5 lg:py-5 md:px-8 lg:px-16">
      <Link className={`${hasSearch ? 'hidden lg:block' : ''}`} href="/">
        <Image width={55} className={'block lg:hidden'} src={logo} alt="Rango logo" />
        <Image className={'hidden lg:block'} src={desktopLogo} alt="Rango logo" />
      </Link>
      <button
        className={`ml-1 ${hasSearch ? 'lg:hidden block' : 'hidden'}`}
        onClick={() => setShowSearchInput(!showSearchInput)}
      >
        {showSearchInput ? (
          <p className="text-xs">Cancel</p>
        ) : (
          <Image className="w-7 h-7" src={search} alt="search" />
        )}
      </button>

      <div className="w-full lg:w-auto lg:flex lg:items-center">
        {hasSearch && (
          <div
            className={`${
              showSearchInput ? 'flex' : 'hidden lg:flex'
            } w-full border border-neutral-900 lg:mr-6 rounded-full lg:rounded-md items-center`}
          >
            <input
              className="mx-3.5 w-8 bg-transparent h-8 flex-1 focus:outline-0 md:w-auto md:h-14 md:mx-6"
              placeholder="Search ..."
              onKeyDown={handleKeyPress}
              value={query}
              onChange={onChangeQuery}
            />
             <Image
              className="cursor-pointer w-5 h-5 lg:w-6 lg:h-6 mr-3.5 md:mr-6"
              src={search}
              alt="search"
              onClick={handleOnClick}
            />
            {query && (
              <button className="mr-3.5 lg:hidden" onClick={() => setQuery('')}>
                <Image src={clear} alt="clear" className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        <div className={`${showSearchInput ? 'hidden' : 'block'} lg:block`}>
          <Menu />
        </div>
      </div>
    </header>
  )
}

export default Navbar
