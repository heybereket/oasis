/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <meta name="theme-color" content="#5C91FC" />
          <meta
            name="Description"
            content="an example of NextJS app with 100% accessible lighthouse score"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="static/favicons/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
