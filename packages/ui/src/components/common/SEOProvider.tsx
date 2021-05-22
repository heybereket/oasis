import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title: string;
  description?: string;
  metaTitle?: string;
  metaDesc?: string;
  metaImg?: string;
}

export const SEOProvider: React.FC<SEOProps> = ({
  title,
  description,
  metaTitle,
  metaDesc,
  metaImg,
}) => {
  return (
    <Head>
      <title>{title} - Oasis</title>
      <meta name="description" content={description} />
      {metaTitle ? (
        <meta name="og:title" content={metaTitle} />
      ) : (
        <meta name="og:title" content={title} />
      )}
      <meta name="og:description" content={metaDesc} />
      <meta name="og:image" content={metaImg} />
    </Head>
  );
};
