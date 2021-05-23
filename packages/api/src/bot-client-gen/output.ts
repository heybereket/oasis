import { joinRoot } from '@utils/common/rootPath';
import { getSchema } from '@utils/getSchema';
import { writeFileSync } from 'fs';

(async () => {
  await getSchema();

  const {
    allFields,
    allResolvers,
    overrides,
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

  let output = 'import BaseClient from "./base-client";\n';
  output += 'import PaginationResponseType from "./pagination-response";\n\n';

  output += overrides.join('\n\n');

  for (const prop in allFields) {
    const val = allFields[prop];

    output += `interface ${prop} {${val}\n}\n\n`;
  }

  output += 'export class Client extends BaseClient {\n';

  for (const key in allResolvers) {
    output += `// ${key.toUpperCase()}\n`;

    output += `${key} = {\n`;
    for (const { name } of allResolvers[key]) {
      const query = `{ ${name} { \${this.getSelection("${name}")} } }`;

      output += ` ${name}: () => {\n`;
      output += `   return this.fetchGraphQL(\`${query}\`, data => data["${name}"])\n`;
      output += ` },\n`;
    }
    output += '}\n';
  }

  output += '}\n';

  writeFileSync(joinRoot('../../bot-client/src/generated.ts'), output);
})();
