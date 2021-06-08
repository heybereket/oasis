import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('Testing making badges', () => {
  const badgeMutation = gql`
    mutation {
      makeBadge(
        data: {
          name: "test-badge"
          imagePath: ""
          level: 1
          description: "a testing badge"
        }
      )
    }
  `;

  it('Expect error if making a badge without being an admin', async () => {
    expect(
      createClient().mutate({ mutation: badgeMutation })
    ).rejects.toBeDefined();
  });

  it('Expect badge to be made when admin', async () => {
    const res = await createClient('TESTING adminTesting').mutate({
      mutation: badgeMutation,
    });
    expect(res.data.makeBadge).toBe(true);
  });
});
