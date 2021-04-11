import { AppProps } from "next/app";
import React from "react";
import "styles/globals.css";
import { getFirebase } from "../lib/firebase";

getFirebase();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
