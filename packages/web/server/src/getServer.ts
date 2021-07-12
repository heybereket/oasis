import express, { Express } from 'express';
import { getDatabase } from './config/database';

export const getServer = async (): Promise<Express> => {
  const app = express();

  if (!process.env.STAGING_API) {
    getDatabase();
  }

  return app;
};
