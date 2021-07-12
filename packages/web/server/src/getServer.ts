import express, { Express } from 'express';

export const getServer = async (): Promise<Express> => {
  const app = express();

  if (!process.env.STAGING_API) {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    return import('@oasis-sh/api').then(
      async ({ initializeServer }) => await initializeServer()
    );
  }

  return app;
};
