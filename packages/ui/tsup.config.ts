import type { Options } from 'tsup';

export const tsup: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  entryPoints: ['src/index.ts'],
};
