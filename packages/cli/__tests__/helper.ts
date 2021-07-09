import { spawnSync } from 'child_process';
import { gqlURL } from '../src/lib/constants';
import path from 'path';

const serverURL =
  process.env.TESTING === 'true' ? 'http://localhost:3000' : gqlURL;

const execCommand = (command: string, args?: string[]) => {
  const { output } = spawnSync('node', [
    path.join(__dirname, '..', './bin/oasis'),
    command,
    ...args,
  ]);

  const [_, stdout, stderr] = output;

  if (stderr.toString()) return [null, stderr.toString()];

  return [stdout.toString(), null];
};

export { execCommand, serverURL };
