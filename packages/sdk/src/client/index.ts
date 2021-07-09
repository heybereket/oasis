import genArguments from './arguments';
import listAll from './listAll';
import mainClient from './main';
import relations from './relations';

(async () => {
  await mainClient();
  await relations();
  await listAll();
  await genArguments();
})();
