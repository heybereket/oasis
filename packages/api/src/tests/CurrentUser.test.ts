import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-core';

describe('Tests Current User', () => {
  it('Get Current User', async () => {
    const query = gql`
      query {
        currentUser {
          id
          username
        }
      }
    `;
    const res = await createClient().query({
      query,
    });

    expect(res.data.currentUser.username).toBe('testing');
  });
});
