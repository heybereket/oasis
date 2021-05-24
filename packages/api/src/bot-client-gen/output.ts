import { joinRoot } from '@utils/common/rootPath';
import { getSchema } from '@utils/getSchema';
import { writeFileSync } from 'fs';

(async () => {
  await getSchema();

  const {
    allFields,
    allResolvers,
    overrides,
    keyMap,
  }: {
    allFields: { [key: string]: string };
    keyMap: { [key: string]: string };
    allResolvers: {
      [key: string]: {
        name: string;
        type: 'mutation' | 'query';
        args: string;
        returnType: string;
      }[];
    };
    overrides: any[];
  } = require('./index');

  let typeOutput = '';

  let output = 'import BaseClient from "../base-client";\n';
  output += `import { ${Object.values(keyMap).join(
    ', '
  )} } from "./types";\n\n`;
  typeOutput +=
    'import PaginationResponseType from "../pagination-response";\n\n';

  typeOutput += overrides.join('\n');

  for (const prop in allFields) {
    const val = allFields[prop];

    typeOutput += `export interface ${prop} {${val}\n}\n\n`;
  }

  output += 'export class Client extends BaseClient {\n';

  typeOutput += 'type EntityKey = ';
  for (const key in allResolvers) {
    output += `  // ${key.toUpperCase()}\n`;

    typeOutput += `"${key}" | `;

    output += `  ${key} = {\n`;
    for (const { name, args } of allResolvers[key]) {
      const query = `{ ${name} { \${selection.join(",")} } }`;

      output += `    ${name}: (${args}) => {\n`;
      output += `      const selection = this.options.selections?.${key} || [];\n`;
      output += `      return this.fetchGraphQL<Pick<${
        keyMap[key]
      }, typeof selection[0]>>(\`${query}\`, data => data["${name}"], { ${args
        .split(', ')
        .map((s) => s.split(':')[0])
        .join(', ')} })\n`;
      output += `    },\n`;
    }
    output += '  }\n';
  }

  output += '}\n';
  typeOutput = typeOutput.slice(0, -3) + '\n\n';
  typeOutput += 'interface EntityKeyMap {\n';
  typeOutput += Object.entries(keyMap)
    .map(([k, v]) => `  ${k}?: ${v};\n`)
    .join('');
  typeOutput += '}\n\n';
  typeOutput += `export type Selections = { [P in EntityKey]?: (keyof EntityKeyMap[P])[] };`;

  writeFileSync(joinRoot('../../bot-client/src/generated/client.ts'), output);
  writeFileSync(
    joinRoot('../../bot-client/src/generated/types.ts'),
    typeOutput
  );
})();
