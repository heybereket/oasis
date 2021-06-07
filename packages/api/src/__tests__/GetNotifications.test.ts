import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('GetNotifications query test', () => {
  const getNotificationsQuery = gql`
    {
      getNotifications {
        id
      }
    }
  `;

  it('Expect get notifications query to be type of array', async () => {
    const res = (await createClient().query({ query: getNotificationsQuery }))
      .data.getNotifications;

    expect(res).toBeInstanceOf(Array);
  });
});
