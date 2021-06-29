import { Client } from '@oasis-sh/sdk';
import { Options } from '@oasis-sh/sdk/src/base-client';

export default (options: Options) => {
  return new Client(options);
};
