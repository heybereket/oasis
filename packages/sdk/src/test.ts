import './test-utils/setup';
import { Client } from '.';

const client = new Client({
  token: process.env.TOKEN,
});

(async () => {
  const data = await client
    .createQueryBuilder('currentUser')
    .addFields({
      __typename: true,
      id: true,
      isBot: true,
      posts: {
        ARGS: {
          limit: 50,
          offset: 0,
        },
        items: {
          id: true,
          createdAt: true,
        },
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
