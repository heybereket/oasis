/* eslint-disable no-multi-assign */
/* eslint-disable no-continue */
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

type FieldType = { __returns__: string; [argName: string]: string };
type ResolverType = { [fieldName: string]: FieldType };
export type GQLArgumentTypes = {
  [resolver: string]: ResolverType;
};

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export default async function genArguments() {
  const content = (
    await readFile(join(__dirname, '../../../api/schema.gql'))
  ).toString();

  const matches = [
    ...content.matchAll(/type\s+(.*?)\s+{(\r?)\n(.*?)(\r?)\n}/gs),
  ].map((a) => [...a]);

  const results: GQLArgumentTypes = {};
  const typeResults: any = {};

  const allImports = [
    'Post',
    'Answer',
    'Question',
    'Resort',
    'User',
    'Comment',
    'Mutation',
    'Query',
  ];

  for (const [_, parentType, __, fieldsStr] of matches) {
    const data: ResolverType = (results[parentType] = {});
    const typeData = (typeResults[parentType] = {});

    for (const field of fieldsStr.split('\n')) {
      const __returns__ = field
        .slice(field.lastIndexOf(': ') + 2)
        .replace(/(!|\[|\])/g, '');

      if (!field.includes('(')) {
        data[field.slice(2, field.indexOf(':'))] = { __returns__ };
        continue;
      }

      const fieldName = field.slice(2, field.indexOf('('));

      const fieldData: FieldType = (data[fieldName] = {
        __returns__,
      });

      const argType = `${parentType}${capitalize(fieldName)}Args`;
      typeData[fieldName] = argType;
      allImports.push(argType);

      const argsStr = field.slice(field.indexOf('(') + 1, field.indexOf(')'));

      for (const argStr of argsStr.split(', ')) {
        const [name, type] = argStr.split(': ');
        fieldData[name] = type;
      }
    }
  }

  await writeFile(
    join(__dirname, '../generated/arguments.ts'),
    `import type { GQLArgumentTypes } from "../client/arguments";\nimport type {\n  ${allImports.join(
      ',\n  '
    )}\n} from "./types";\n\nexport const ArgumentGQLTypes: GQLArgumentTypes = ${JSON.stringify(
      results,
      null,
      2
      // )};`
    )};\nexport type NestedArguments = {${Object.entries(typeResults).map(
      ([type, fields]) =>
        `\n  ${type}: {\n    ${Object.entries(fields)
          .map((a) => a.join(': '))
          .join(';\n    ')}\n  }`
    )}};\n\nexport type ArgLogic<R, K> = ${Object.keys(typeResults)
      .filter((a) => Object.keys(typeResults[a]).length > 0)
      .map(
        (key) =>
          `R extends ${key} ? K extends keyof NestedArguments['${key}'] ? { ARGS: NestedArguments['${key}'][K] } : {} : `
      )
      .join('\n')} {};`
  );
}

if (require.main === module) genArguments();
