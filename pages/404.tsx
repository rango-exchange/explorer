import Layout from '../components/Layout'
import NotFoundAnything from '../components/NotFoundAnything'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import copy from '../public/img/copy.svg'
import { CopyText } from '../utils/copyText'
import Image from 'next/image'

const NotFound: NextPage = () => {
  const router = useRouter()
  const { query }: { query?: string } = router.query
  return (
    <Layout pageTitle="404-Not Found">
      {query != null && (
        <div className="flex items-center text-base font-bold mb-3 lg:mb-6 lg:text-28">
          search results: <span className="font-normal ml-1">{query}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              CopyText(query)
            }}
            className="group relative cursor-pointer"
          >
            <Image src={copy} alt="copy_to_clipboard" />
          </button>
        </div>
      )}
      <NotFoundAnything />
    </Layout>
  )
}

export default NotFound
