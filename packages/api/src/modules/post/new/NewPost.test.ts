import { createClient } from '@utils/test-utils/gql-request';
import { gql } from 'apollo-server-express';

describe('Testing Creating Posts', () => {
  it('Expect API to return true when passing a valid post', () => {
    const mutation = gql`
      mutation {
        newPost(data: { message: "This is a test post", topics: [] })
      }
    `;

    expect(createClient().mutate({ mutation })).toBeTruthy();
  });

  it('Expect error if message is empty', () => {
    const mutation = gql`
      mutation {
        newPost(data: { message: "", topics: [] })
      }
    `;

    expect(createClient().mutate({ mutation })).rejects.toBeDefined();
  });
});
