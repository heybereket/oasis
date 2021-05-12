import { join } from 'path';

export const rootPath = join(__dirname, '../../../dist');
export const joinRoot = (...paths: string[]) => join(rootPath, ...paths);
