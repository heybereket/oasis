import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: any;
  description?: string;
  metaTitle?: string;
  metaDesc?: string;
  metaImg?: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  metaDesc,
  metaImg,
  metaTitle,
  keywords,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
      />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {metaTitle ? (
        <meta name="og:title" content={metaTitle} />
      ) : (
        <meta name="og:title" content={title} />
      )}
      <meta name="og:description" content={metaDesc} />
      <meta name="og:image" content={metaImg} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImg} />
      <meta name="theme-color" content="#306EEA" />
    </Head>
  );
};
