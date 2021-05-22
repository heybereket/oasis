import express, { Express } from 'express';

export const getServer = async (
  apiMode: string | undefined
): Promise<Express> => {
  if (apiMode === 'local') {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    return import('@oasis-sh/api').then(
      async ({ createApp }) => await createApp()
    );
  }

  // connect to staging
  const app = express();
  app.disable('x-powered-by');
  return app;
};
