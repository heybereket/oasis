import { nodeMajor } from '@lib/constants';
import * as log from '@lib/log';
import { exit } from '@lib/exit';

export const checkNodeMajor = (version: number) => {
  if (nodeMajor < version) {
    log.error(
      `You are currently running on Node ${nodeMajor}. Oasis requires Node ${version} or higher.`
    );
    exit(1);
  }
};
