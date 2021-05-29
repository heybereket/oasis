import express, { Express } from 'express';

export const getServer = async (apiMode: string): Promise<Express> => {
  if (apiMode === 'local') {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    return import('@oasis-sh/api').then(
      async ({ createApp }) => await createApp()
    );
  }

  const app = express();
  return app;
};
