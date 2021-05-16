import { chalkLog } from './chalkLog';

export const ExitWithErrors = (amount: number): any => {
  chalkLog('error', `Exiting with ${amount} error${amount > 1 && 's'}...`);
  return process.exit(1);
};
