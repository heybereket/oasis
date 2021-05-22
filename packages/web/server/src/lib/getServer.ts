import express, { Express } from 'express';
import { chalkLog } from './chalkLog';
import { ExitWithErrors } from './ExitWithErrors';

export const getServer = async (apiMode: string): Promise<Express> => {
  if (apiMode === 'local') {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      chalkLog(
        'error',
        `NEXT_PUBLIC_BASE_URL is undefined in packages/web/.env`
      );
      ExitWithErrors(1);
    }

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    return import('@oasis/api').then(
      async ({ createApp }) => await createApp()
    );
  }

  // connect to staging
  const app = express();
  app.disable('x-powered-by');
  return app;
};
