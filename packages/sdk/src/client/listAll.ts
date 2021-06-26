import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const pathToTypes = join(__dirname, '../generated/types.ts');

export default async function listAll() {
  const content = readFileSync(pathToTypes).toString();

  const allMutations = [
    ...content
      .match(/Mutation\s+=\s+\{(.*?)\}/gs)[0]
      .matchAll(/\s*(.*?)(\??):\s*(.*?)(;?)\n/g),
  ]
    .slice(1)
    .map(([, resolverName]) => resolverName);

  const allQueries = [
    ...content
      .match(/Query\s+=\s+\{(.*?)\}/gs)[0]
      .matchAll(/\s*(.*?)(\??):\s*(.*?)(;?)\n/g),
  ]
    .slice(1)
    .map(([, resolverName]) => resolverName);

  const allMutationArgTypes = allMutations
    .map((m) => `Mutation${m[0].toUpperCase()}${m.slice(1)}Args`)
    .filter((x) => content.includes(`export type ${x} = {`));

  const allQueryArgTypes = allQueries
    .map((m) => `Query${m[0].toUpperCase()}${m.slice(1)}Args`)
    .filter((x) => content.includes(`export type ${x} = {`));

  const allArgs = [
    ...allMutationArgTypes.map((s, i) => `  ${allMutations[i]}: ${s}`),
    ...allQueryArgTypes.map(
      (s, i) => `  ${s[5].toLowerCase()}${s.slice(6, -4)}: ${s}`
    ),
  ];

  writeFileSync(
    join(__dirname, '../generated/allResolvers.ts'),
    [
      `import {\n  ${[...allMutationArgTypes, ...allQueryArgTypes].join(
        ',\n  '
      )},\n} from "./types";`,
      '',
      `export const allQueries = ["${allQueries.join('", "')}"];`,
      `export const allMutations = ["${allMutations.join('", "')}"];`,
      '',
      'export type Arguments = {',
      ...allArgs,
      '};\n',
    ].join('\n')
  );
}
