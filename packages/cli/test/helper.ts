import { execSync } from 'child_process';

const testCommand = (command: string, args: string) => {
  return execSync(`node dist/index.js ${command} ${args}`).toString();
};

export default testCommand;
