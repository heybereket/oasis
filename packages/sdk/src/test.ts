import './test-utils/setup';
import { Client } from '.';
import { variable } from './variable-type';

const client = new Client({
  token: process.env.TOKEN,
});

(async () => {
  // const data = await client.post.paginate({ limit: 2, offset: 0 }, [
  //   'id',
  //   'message',
  // ]);

  const data = await client
    .createQueryBuilder('paginatePosts')
    .addFields('id', 'message')
    .args({
      limit: variable('lim'),
      offset: variable('off'),
    })
    .send({ lim: 2, off: 0 });

  console.log(data);
})();

// describe('Nothing', () => {
//   it('pass', () => {
//     expect(true).toBe(true);
//   });
// });
