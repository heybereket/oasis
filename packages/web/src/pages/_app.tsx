import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { getFirebase } from '../lib/firebase';
import Head from 'next/head';

getFirebase();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oasis - Discover and Discuss</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
        <meta
          name="description"
          content="Oasis - Discover new ideas, Discuss with developers."
        />
        <meta
          name="keywords"
          content="developers,ideas,discuss,fun,programming,graphql,typescript,nextjs,firebase,tailwindcss,react,apollo"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
