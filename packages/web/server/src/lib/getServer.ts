import express, { Express } from 'express';

export const getServer = async (apiMode: string): Promise<Express> => {
  const app = express();

  if (apiMode === 'local') {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    return import('@oasis-sh/api').then(
      async ({ initializeServer }) => await initializeServer()
    );
  }

  return app;
};
