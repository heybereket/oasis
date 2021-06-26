import './test-utils/setup';
import { Client } from '.';

const client = new Client({
  token: process.env.TOKEN,
});

(async () => {
  const data = await client
    .createQueryBuilder('paginatePosts')
    .addFields({
      __typename: true,
      id: true,
      author: {
        id: true,
      },
      ARGS: {
        limit: 50,
        offset: 50,
      },
    })
    .send();

  console.log(data);
})();

// describe('Nothing', () => {
//   it('pass', () => {
//     expect(true).toBe(true);
//   });
// });
