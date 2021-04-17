import { join } from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync(join(__dirname, './modules'), { extensions: ['js'] });

export default mergeResolvers(resolversArray);
