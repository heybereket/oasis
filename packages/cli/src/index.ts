import * as yargs from 'yargs';
import fs from 'fs';
import * as log from './utils/log';

<<<<<<< HEAD
const argv = <any>(
  yargs.commandDir('commands').demandCommand().version('1.0.0').argv
);

const commands = fs.readdirSync('./');

for (const file in commands) {
  if (!argv._) break;
  const command = file.slice(0, -3);
  if (argv._[0] !== command) {
    log.error('that command does not exist!');
    break;
  }
}
=======
yargs.commandDir('commands').demandCommand().version('1.0.0').argv;
>>>>>>> 08ae8e95 (feat(cli): added more commands)
