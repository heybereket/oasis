import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('Testing GetQueue query', () => {
  const getQueueQuery = gql`
    {
      getQueue {
        id
      }
    }
  `;

  it('Expect error if user does not have permission', async () => {
    expect(
      createClient().query({
        query: getQueueQuery,
      })
    ).rejects.toBeDefined();
  });

  it('Expect a valid response if user does have permission', async () => {
    const res = await createClient('TESTING adminTesting').query({
      query: getQueueQuery,
    });
    expect(res.data.getQueue).toBeInstanceOf(Array);
  });
});
