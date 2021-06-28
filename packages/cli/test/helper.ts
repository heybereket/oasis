import { spawnSync } from 'child_process';

const testCommand = (command: string, args?: string[]) => {
  const { output } = spawnSync('node', ['dist/index.js', command, ...args]);

  const [_, stdout, stderr] = output;

  if (stderr.toString()) return [null, stderr.toString()];

  return [stdout.toString(), null];
};

export default testCommand;
