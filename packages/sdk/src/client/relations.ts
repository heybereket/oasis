import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import { join, parse } from 'path';

const globPath = join(__dirname, '../../../api/src/entities/*.ts');
const genFile = join(__dirname, '../../src/generated/relations.ts');

export const relations: any = {};

export default async function genRelations() {
  const filenames = await new Promise<string[]>((resolve, reject) => {
    glob(globPath, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  for (const filename of filenames) {
    // eslint-disable-next-line no-continue
    if (filename.endsWith('Connection.ts')) continue;

    const content = (await readFile(filename)).toString();
    const { name } = parse(filename);
    const entityKey = name.toLowerCase();

    const matches = [
      ...content.matchAll(/\n\s+(.*?)(\??):\s*Promise<(.*?)>;/g),
    ];

    const entityRelations = {};
    relations[entityKey] = entityRelations;

    for (const [, fieldName, , type] of matches) {
      entityRelations[fieldName] = type.toLowerCase();
    }
  }

  await writeFile(
    genFile,
    `export const relations = ${JSON.stringify(relations, null, 2)};\n`
  );
}
