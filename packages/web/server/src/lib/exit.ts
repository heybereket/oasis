import { chalkLog } from './chalkLog';

export const exit = (amount: number): any => {
  chalkLog(
    'error',
    `${
      amount >= 1
        ? `Exiting with ${amount} error`
        : `Exiting with ${amount} errors`
    }...`
  );
  return process.exit(1);
};
