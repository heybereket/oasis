import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('CreateResort mutation test', () => {
  const createResortMutation = gql`
    mutation {
      createResort(
        data: {
          name: "Test Resort"
          description: "Test Description"
          banner: "Test Banner URL"
          logo: "Test Logo URL"
          category: "test category"
        }
      )
    }
  `;

  it('Expect to createResort mutation to return true when trying to create a valid resort', async () => {
    const res = (
      await createClient().mutate({ mutation: createResortMutation })
    ).data.createResort;

    expect(res).toBeTruthy();
  });
});
