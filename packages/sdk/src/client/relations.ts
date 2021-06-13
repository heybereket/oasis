import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { join, parse } from 'path';

const globPath = join(__dirname, '../../../api/src/entities/*.ts');
const genFile = join(__dirname, '../../src/generated/relations.ts');

export default async function relations() {
  glob(globPath, (err, filenames) => {
    if (err) throw err;

    const relations: any = {};

    for (const filename of filenames) {
      // eslint-disable-next-line no-continue
      if (filename.endsWith('Connection.ts')) continue;

      const content = readFileSync(filename).toString();
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

    writeFileSync(
      genFile,
      `export const relations = ${JSON.stringify(relations, null, 2)};\n`
    );
  });
}
