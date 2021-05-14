import 'reflect-metadata';
import { getSchema } from '@utils/getSchema';
import { config } from 'dotenv';
config();

getSchema().then(() => process.exit());
