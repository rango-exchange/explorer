/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { makeColumns } from '../components/MakeColumns'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { getSearchResult, getWalletSwaps } from '../services'
import { MATCH_TYPE } from '../constant'
import NotFoundAnything from '../components/NotFoundAnything'
import Loading from '../components/Loading'
import useSWR from 'swr'
import Error from 'next/error'
import Image from 'next/image'
import copy from '../public/img/copy.svg'
import { CopyText } from '../utils/copyText'
interface PropsType {
  status?: number
}
const Home: NextPage<PropsType> = ({ status }: PropsType) => {
  const router = useRouter()
  const { query } = router.query
  const { data } = useSWR(query, getWalletSwaps)

  const handleSwapDetails = useCallback((id: string) => {
    router.push(`/swap/${id}`)
  }, [])

  return status || (data && data.error && data.status) ? (
    <Error statusCode={data?.status || status} />
  ) : (
    <Layout pageTitle={`Address ${query as string}`}>
      <div className="flex items-center text-base text-black truncate font-bold mb-3 lg:text-xl lg:mb-6">
        search results: <span className="font-normal ml-1">{query}</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            CopyText(query as string)
          }}
          className="group relative cursor-pointer"
        >
          <Image src={copy} alt="copy_to_clipboard" />
        </button>
      </div>

      {!data ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : !data.transactions.length ? (
        <NotFoundAnything />
      ) : (
        <Table makeColumns={makeColumns} data={data.transactions} onClick={handleSwapDetails} />
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.query

  const result = await getSearchResult(query as string)
  if (result?.error) return { props: { status: result.status } }
  if (!result.length) return { notFound: true }
  if (result[0].matchType === MATCH_TYPE.REQUESTID) {
    return {
      redirect: {
        permanent: false,
        destination: `/swap/${query as string}`
      }
    }
  }
  return {
    props: {}
  }
}
export default Home
