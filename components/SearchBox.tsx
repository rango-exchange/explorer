import Image from 'next/image'
import { useRouter } from 'next/router'
import search from '../public/img/search.svg'
import { FormEvent, MouseEvent, useState } from 'react'

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const router = useRouter()
  const onSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (query) {
      router.push({
        pathname: '/search',
        query: { query }
      })
    }
  }

  return (
    <div className="w-full px-4 h-56 lg:h-[347px] bg-no-repeat bg-cover pt-12 md:pt-16 lg:pt-20 bg-[url('/img/bg-head.png')] md:flex md:flex-col">
      <p className="text-center text-neutral-100 mb-4 font-bold text-lg md:text-3xl lg:text-5xl">
        Rango Swap Search
      </p>

      <form
        onSubmit={onSubmit}
        className="overflow-hidden bg-neutral-100 h-fit w-full py-0.5 rounded-full flex items-center md:rounded-md lg:w-2/4 md:py-2 md:w-4/5 md:self-center"
      >
        <input
          className="bg-white px-3.5 h-9 flex-1 focus:outline-0 md:h-[53px] md:px-5 overflow-hidden"
          placeholder="Search by request Id, tx hash or address"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="h-10 w-10 bg-primary rounded-full mr-0.5 flex justify-center items-center text-center md:rounded-md md:mr-3 md:w-44 md:h-[53px]"
        >
          <span className="hidden md:block font-bold lg:text-xl md:text-lg">Search</span>

          <Image src={search} alt="search" className="md:hidden" />
        </button>
      </form>
    </div>
  )
}

export default SearchBox
