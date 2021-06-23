import * as yargs from 'yargs';
import fs from 'fs';
import * as log from './utils/log';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8eb29849 (feat(cli): error out when unknown command is called)
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
<<<<<<< HEAD
=======
yargs.commandDir('commands').demandCommand().version('1.0.0').argv;
>>>>>>> 08ae8e95 (feat(cli): added more commands)
=======
>>>>>>> 8eb29849 (feat(cli): error out when unknown command is called)
