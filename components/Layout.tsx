import Head from 'next/head'
import Navbar from './Navbar'

interface PropsType {
  children: React.ReactNode
  pageTitle: string
}

const Layout: React.FC<PropsType> = ({ children, pageTitle }: PropsType) => (
  <div>
    <Head>
      <title>{`${pageTitle} | Rango Scanner`}</title>
    </Head>
    <Navbar hasSearch />
    <main className="py-7 px-5 lg:py-11 lg:px-16">{children}</main>
  </div>
)

export default Layout
