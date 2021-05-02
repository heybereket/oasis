import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      {props.ogTitle && <meta name="og:title" content={props.ogTitle} />}
      {props.ogDescription && (
        <meta name="og:description" content={props.ogDescription} />
      )}
      {props.ogImage && <meta name="og:image" content={props.ogImage} />}
    </Head>
  );
};
