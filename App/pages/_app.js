import { SessionProvider } from 'next-auth/react'
import Head from 'next/head';
import '../styles/globals.css'

function App({
  Component, 
  pageProps: { session, ...pageProps },
}) {
  return (
    <div className='h-screen w-screen bg-dim_bg overflow-hidden'>
      <Head>
        <title>Fokus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Component {...pageProps} /> 
      </SessionProvider>
    </div>
  )
}

export default App
