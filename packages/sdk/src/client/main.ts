import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';

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
      const imports = ['Mutation', 'Query'];

      output += 'import BaseClient from "../base-client";\n';
      output += 'import { Field } from "../query-builder";\n';
      output += 'import {/* IMPORT_SPACE */} from "./types";\n';
      output += 'export class Client extends BaseClient {\n';

      for (const key in keyMap) {
        const resolverNames = keyMap[key];
        output += `  ${key} = {\n`;
        for (const [type, resolver] of resolverNames) {
          const argType = `${capitalize(type)}${capitalize(resolver)}Args`;
          const needsArgs = types.includes(argType);

          if (needsArgs) imports.push(argType);

          let argString = !needsArgs
            ? ''
            : types.slice(
                types.indexOf(`export type ${argType} = {\n`) +
                  `export type ${argType} = {\n`.length
              );

          argString = argString.slice(0, argString.indexOf('}'));

          console.log(argType, argString);

          const argEntries = argString
            .split('\n')
            .filter((x) => x)
            .map((x) =>
              x
                .trim()
                .split(':')
                .map((x) => x.trim())
            );

          const scalarKeys = [];
          const objKeys = [];
          const optionalKeys = [];

          for (const [key, val] of argEntries) {
            const arr = key.includes('?')
              ? optionalKeys
              : val.startsWith("Scalars['")
              ? scalarKeys
              : objKeys;

            // console.log(key);

            arr.push(key.includes('?') ? key.slice(0, -1) : key);
          }

          const argKeys: string[] = [
            ...scalarKeys,
            ...objKeys,
            ...optionalKeys,
          ];

          output += `    ${resolver.replace(
            new RegExp(`${key}(s?)`, 'ig'),
            ''
          )}: (\n${[
            ...argKeys.map(
              (k) =>
                `      ${k}${
                  optionalKeys.includes(k) ? '?:' : ':'
                } ${argType}['${k}'],`
            ),
            `      queryFields: Field<"${resolver}"> = {}`,
          ].join('\n')}\n    ) => {`;
          // output += `      return this.fetchGraphQL<${capitalize(
          //   type
          // )}["${resolver}"]>(\n`;

          // output += `        \`${type} { paginateBadges { \${this.getSelections("${key}")} } }\`,\n`;
          // output += `        data => data.${resolver},\n`;
          // output += `        { ${argKeys.join(', ')} }\n`;
          // output += `      );\n`;
          output += `
            return this
              .createQueryBuilder("${resolver}")
              .args({${needsArgs ? ` ${argKeys.join(', ')} ` : ''}})
              .addFields(queryFields)
              .send()
          },\n`
            .split('\n')
            .map((x) => x.replace('      ', ''))
            .join('\n');
        }
        output += '  };\n';
      }

      output += '}\n';

      output = output.replace(
        '/* IMPORT_SPACE */',
        '\n  ' + imports.join(',\n  ') + ',\n'
      );

      await writeFile(genFile, output);

      resolve(null);
    });
  });
}
