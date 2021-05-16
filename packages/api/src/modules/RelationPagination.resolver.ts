import { allFieldResolvers } from '@utils/RelationalPagination';

let n = 0;

for (const getResolver of allFieldResolvers) {
  exports[`RelationalDataResolver${n++}`] = getResolver();
}
