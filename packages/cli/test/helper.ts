import { execSync } from 'child_process';

const testCommand = (command: string, args: string | undefined) => {
  try {
    return [execSync(`node dist/index.js ${command} ${args}`).toString(), null];
  } catch (e) {
    return [null, e];
  }
};

export default testCommand;
