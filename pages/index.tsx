import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Medium Blog Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div>
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-[#fcbc2d] decoration-4">
              Medium
            </span>{' '}
            is the place to let people discover,thinking and connect.
          </h1>
          <h2>
            Post everything you learn and here with everyone at here to make the
            world better.
          </h2>
        </div>
        <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" />
      </div>
    </div>
  )
}

export default Home
