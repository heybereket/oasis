import { buildSchema } from 'type-graphql';
import { joinRoot } from '@utils/common/rootPath';
import { customAuthChecker } from '@utils/auth/authChecker';
import { glob as _glob } from 'glob';
import { promisify } from 'util';
import { NotBanned } from '@root/middleware/NotBanned';

const glob = promisify(_glob);

export const createSchema = async () => {
  const filenames = await glob(joinRoot('./resolvers/**/*.resolver.js'));

  filenames.push(joinRoot('./utils/paginate/RelationalPaginationResolvers.js'));

  const resolvers: any = filenames
    .map((filename) => Object.values(require(filename)))
    .flat();

  return buildSchema({
    resolvers,
    emitSchemaFile: joinRoot('../schema.gql'),
    authChecker: customAuthChecker,
    globalMiddlewares: [NotBanned(false)],
  });
};

if (require.main === module) {
  process.env.BOT_CLIENT_MODE = 'true';
}
