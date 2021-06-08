import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('Testing Search Query', () => {
  it('Testing if search query works after given valid query', async () => {
    const serachQuery = gql`
      {
        search(limit: 999, searchQuery: "") {
          ... on User {
            id
            name
          }
        }
      }
    `;

    const res = await createClient().query({ query: serachQuery });
    const search: any[] = res.data.search;
    expect(search).toBeInstanceOf(Array);
    expect(search.length).toBeGreaterThan(0);
  });
});
