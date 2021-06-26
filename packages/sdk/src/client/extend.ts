import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';

const dir = join(__dirname, '../../../api/src/resolvers/**/*.resolver.ts');
const genFile = join(__dirname, '../../src/generated/client.ts');

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export default async function extend() {
  const types = (
    await readFile(join(__dirname, '../../src/generated/types.ts'))
  ).toString();

  return new Promise((resolve) => {
    glob(dir, async (err, filenames) => {
      const keyMap: Record<string, string[][]> = {};

      if (err) throw err;

      for (const filename of filenames) {
        const content = (await readFile(filename)).toString();

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
      output += 'import {/* IMPORT_SPACE */} from "./types";\n';
      output += 'export class Client extends BaseClient {\n';

      for (const key in keyMap) {
        const resolverNames = keyMap[key];
        output += `  ${key} = {\n`;
        for (const [type, resolver] of resolverNames) {
          const argType = `${capitalize(type)}${capitalize(resolver)}Args`;
          const needsArgs = types.includes(argType);

          if (needsArgs) imports.push(argType);

          output += `    ${resolver.replace(
            new RegExp(`${key}(s?)`, 'ig'),
            ''
          )}: (${needsArgs ? `args: ${argType}` : ''}) => {\n`;
          output += `      return this.fetchGraphQL<${capitalize(
            type
          )}["${resolver}"]>(\n`;

          output += `        \`${type} { paginateBadges { \${this.getSelections("${key}")} } }\`,\n`;
          output += `        data => data.${resolver},\n`;
          output += `        ${needsArgs ? 'args' : '{}'}\n`;
          output += `      );\n`;
          output += `    },\n`;
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
