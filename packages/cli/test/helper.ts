import { spawnSync } from 'child_process';
import { gqlURL } from '@oasis-sh/shared';

const serverURL =
  process.env.TESTING === 'true' ? 'http://localhost:3000' : gqlURL;

const execCommand = (command: string, args?: string[]) => {
  const { output } = spawnSync('node', ['dist/index.js', command, ...args]);

  const [_, stdout, stderr] = output;

  if (stderr.toString()) return [null, stderr.toString()];

  return [stdout.toString(), null];
};

export { execCommand, serverURL };
