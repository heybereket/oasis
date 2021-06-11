import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

const dir = join(__dirname, '../../../api/src/modules/**/*.resolver.ts');
const genFile = join(__dirname, '../../src/generated/client.ts');
const types = readFileSync(
  join(__dirname, '../../src/generated/types.ts')
).toString();

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

glob(dir, (err, filenames) => {
  const keyMap: Record<string, string[][]> = {};

  if (err) throw err;

  for (const filename of filenames) {
    const content = readFileSync(filename).toString();

    const matches = [...content.matchAll(/\/\/\s*@bcg-resolver\((.*?)\)\n/g)];

    for (const [, str] of matches) {
      const [resolverType, resolverName, key] = str.split(', ');

      (keyMap[key] || (keyMap[key] = [])).push([resolverType, resolverName]);
    }
  }

  let output = '';
  let imports = [];

  output += 'import BaseClient from "../base-client";\n';
  output += 'import { Mutation, Query, /* IMPORT_SPACE */ } from "./types";\n';
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
      output += `      const selection = this.options.selections?.${key} || [];\n`;
      output += `      return this.fetchGraphQL<${capitalize(
        type
      )}["${resolver}"]>(\`${type} { paginateBadges { \${selection.join(",")} } }\`, data => data.${resolver}, ${
        needsArgs ? 'args' : '{}'
      });\n`;
      output += `    },\n`;
    }
    output += '  }\n';
  }

  output += '}\n';

  output = output.replace('/* IMPORT_SPACE */', imports.join(', '));

  console.log(genFile);

  writeFileSync(genFile, output);
});
