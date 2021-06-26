import * as log from './log';

export const exit = (amount: number): any => {
  log.error(
    `${
      amount >= 1
        ? `Exiting with ${amount} error`
        : `Exiting with ${amount} errors`
    }...`
  );
  return process.exit(1);
};
