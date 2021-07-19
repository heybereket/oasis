import * as yargs from 'yargs';
import fs from 'fs';
import * as log from './utils/output/log';
import { gqlURL } from './lib/constants';
import path from 'path';

const main = () => {
  const argv = <any>yargs
    .options({
      auth: {
        type: 'string',
        default: undefined,
        describe: 'Describes the Authorization Header when making requests',
      },
      server: {
        type: 'string',
        default: gqlURL,
        describe: 'Specifies the server to exchange data from',
      },
    })
    .commandDir('commands')
    .demandCommand()
    .version('1.0.10').argv;

  const commands = fs.readdirSync(path.join(__dirname, './commands'));

  for (const file in commands) {
    if (!argv._) break;
    const [command, ...extensions] = file.split('.');

    if (extensions.pop() !== 'ts') break;

    if (argv._[0] !== command) {
      log.error('that command does not exist!');
      break;
    }
  }
};

export default main;
