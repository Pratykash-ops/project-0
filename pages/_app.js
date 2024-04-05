import Head from 'next/head'
import Layout from '../components/Layout'
import { ConfigProvoider } from "../context/config"
import { UserProvider } from "../context/user"
import '../global.css'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
export default function MyApp({ Component, pageProps }) {
  return <>

    <Head>
      <title>Project 0 ∙ A platform for students</title>
    </Head>
    <ConfigProvoider >
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ConfigProvoider>
  </>
}
