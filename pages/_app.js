import { SessionProvider } from 'next-auth/react'
import Head from 'next/head';
import '../styles/globals.css'

function App({
  Component, 
  pageProps: { session, ...pageProps },
}) {
  return (
    <div className='h-full w-full bg-[#FAFBFF]'>
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
