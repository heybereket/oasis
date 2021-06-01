import './test-utils/setup';
import { Client } from '.';

const client = new Client({
  token: process.env.TOKEN,
  selections: {
    user: ['id'],
  },
});

test('gets `currentUser` data', async () => {
  const data = await client.user.current();

  expect(data).toBeTruthy();
  expect(data).toBeInstanceOf(Object);
});
