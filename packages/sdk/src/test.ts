import './test-utils/setup';
import { Client } from '.';

const client = new Client({
  token: process.env.TOKEN,
});

(async () => {
  const data = await client.post.paginate({ limit: 2, offset: 0 }, [
    'id',
    'message',
  ]);

  console.log(data);
})();

// describe('Nothing', () => {
//   it('pass', () => {
//     expect(true).toBe(true);
//   });
// });
