import express, { Express } from 'express';

export const getServer = async (): Promise<Express> => {
  if (process.env.API_MODE === 'local')
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore

    return import('@oasis/api').then(
      async ({ createApp }) => await createApp()
    );

  const app = express();
  app.disable('x-powered-by');
  return app;
};
