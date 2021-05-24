import './test-utils/setup';
import { Client } from '.';

const client = new Client({
  token: process.env.TOKEN,
  selections: {
    users: ['id'],
  },
});

test('gets `currentUser` data', async () => {
  const data = await client.users.getUser('d');

  expect(data).toBeTruthy();
  expect(data).toBeInstanceOf(Object);
});
