import { readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import { join } from 'path';

glob(join(__dirname, '/../**/*.js'), (_, allFilenames) => {
  const filenames = allFilenames.filter(
    (s) =>
      !s.startsWith(
        join(__dirname, '..').replace(/\\/g, '/') + '/bot-client-gen'
      )
  );

  for (const filename of filenames) {
    let content = readFileSync(filename).toString();

    content = content
      .replace(/\/\/ @bcg start(.*?)\/\/ @bcg end/gs, '')
      .replace(/bot_client_gen_1\.(.*?)\((.*?)\)(,?)(;?)/gs, '')
      .replace(
        /const bot_client_gen_1 = require\("@root\/bot-client-gen"\)\;/gs,
        ''
      );

    writeFileSync(filename, content);
  }
});
