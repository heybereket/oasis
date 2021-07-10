import { readFile, writeFile, readdir } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';
import * as prettier from 'prettier';

const dir = join(__dirname, '../../../api/src/resolvers/**/*.resolver.ts');
const genFile = join(__dirname, '../../src/generated/client.ts');

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

const indent = (spaces: string, str: string) =>
  spaces + str.split('\n').join(spaces + '\n');

export default async function mainClient() {
  const types = (
    await readFile(join(__dirname, '../../src/generated/types.ts'))
  )
    .toString()
    .replace(/\r/g, '');

  const wrappers = (await readdir(join(__dirname, '../../src/wrappers'))).map(
    (fileName) => fileName.slice(0, -3)
  );

  return new Promise((resolve) => {
    glob(dir, async (err, filenames) => {
      const keyMap: Record<string, string[][]> = {};

      if (err) throw err;

      for (const filename of filenames) {
        const content = (await readFile(filename))
          .toString()
          .replace(/\r/g, '');

        const matches = [...content.matchAll(/\/\/\s*@bcg-resolver\((.*?)\)/g)];

        for (const [, str] of matches) {
          const [resolverType, resolverName, key] = str.split(', ');

          (keyMap[key] || (keyMap[key] = [])).push([
            resolverType,
            resolverName,
          ]);
        }
      }

      let output = '/* eslint-disable no-invalid-this */\n';
      const imports = [];

      output += 'import BaseClient from "../base-client";';
      output += 'import { Field, ResolverKeys } from "../query-builder";';
      for (const wrapperName of wrappers) {
        output += `import { wrap${capitalize(
          wrapperName
        )} } from "../wrappers/${wrapperName}";`;
      }
      output += 'import {/* IMPORT_SPACE */} from "./types";';
      output += 'export class Client extends BaseClient {';

      for (const key in keyMap) {
        const resolverNames = keyMap[key];
        output += `  ${key} = {\n`;
        if (wrappers.includes(key)) {
          output += `wrap: (${key}: ${capitalize(key)}) => wrap${capitalize(
            key
          )}(${key}, this),`;
          imports.push(capitalize(key));
        }
        for (const [type, resolver] of resolverNames) {
          const argType = `${capitalize(type)}${capitalize(resolver)}Args`;
          const needsArgs = types.includes(argType);

          if (needsArgs) imports.push(argType);

          output += `    ${resolver.replace(
            new RegExp(`${key}(s?)`, 'ig'),
            ''
          )}: (
                ${needsArgs ? `args: ${argType},` : ''}
                queryFields: ResolverKeys<"${resolver}"> | Field<"${resolver}"> = {}
            ) => {`;
          output += `
            return this
              .createQueryBuilder("${resolver}")
              ${needsArgs ? '.args(args)' : ''}
              .addFields(queryFields as any)
              .send()
          },`;
        }
        output += '  };\n';
      }

      output += '}\n';

      output = output.replace(
        '/* IMPORT_SPACE */',
        '\n  ' + imports.join(',\n  ') + ',\n'
      );

      await writeFile(
        genFile,
        prettier.format(output, {
          useTabs: false,
          semi: true,
          singleQuote: true,
          endOfLine: 'lf',
          parser: 'typescript',
        })
      );

      resolve(null);
    });
  });
}
