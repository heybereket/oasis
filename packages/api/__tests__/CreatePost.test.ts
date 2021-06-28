import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('Testing CreatePost mutation', () => {
  it('Expect valid response if given valid mutation', async () => {
    const createPostMutation = gql`
      mutation {
        createPost(data: { message: "test post", topics: [] })
      }
    `;
    const res = await createClient().mutate({ mutation: createPostMutation });

    expect(res.data).toBeTruthy();
  });
});
