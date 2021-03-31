import Head from 'next/head'
import Card from '../components/card.js'

export default function Home() {
  return (
    <div className="center flex-col min-h-screen px-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="center flex-col flex-1 py-20">
        <h1 className="text-center m-0 text-7xl">
          Oasis<a href="https://nextjs.org" className="text-blue-500">.sh</a>
        </h1>
      </main>
    </div>
  )
}