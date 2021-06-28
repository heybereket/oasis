import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: false,
    rootDir: './__tests__',
    testPathIgnorePatterns: ['./__tests__/schemas/*', './__tests__/helper.ts'],
  };
};
