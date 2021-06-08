import 'reflect-metadata';
import { getSchema } from '@utils/files/getSchema';
import { config } from 'dotenv';
config();

getSchema().then(() => process.exit());
