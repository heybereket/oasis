import genArguments from './arguments';
import extend from './extend';
import listAll from './listAll';
import relations from './relations';

(async () => {
  await extend();
  await relations();
  await listAll();
  await genArguments();
})();
