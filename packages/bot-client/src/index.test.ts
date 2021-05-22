import './test-utils/setup';
import Client from '.';

const client = new Client({
  token: process.env.TOKEN,
});

test('gets `currentUser` data', async () => {
  const data = await client.currentUser();
  expect(data).toBeTruthy();
  expect(data).toBeInstanceOf(Object);
});
