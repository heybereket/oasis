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
  // Serve static files
  app.use(express.static('public'));
  app.use(express.static('.next'));
  app.disable('x-powered-by');
  return app;
};
