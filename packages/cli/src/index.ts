import * as yargs from 'yargs';
import fs from 'fs';
import * as log from '@oasis-sh/shared';
import path from 'path';

const main = () => {
  const argv = <any>yargs
    .commandDir('commands')
    .demandCommand()
    .version('1.0.0').argv;

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
