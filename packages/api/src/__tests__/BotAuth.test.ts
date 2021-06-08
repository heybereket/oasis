import { createClient } from '@utils/testing/gql-request';
import { gql } from 'apollo-server-express';

describe('Testing Bot Authentication', () => {
  let botToken: string;

  it('Create A Bot', async () => {
    const userClient = createClient();

    const mutation = gql`
      mutation {
        createBot(data: { username: "testingBot", name: "Testing Bot" })
      }
    `;

    const res = await userClient.mutate({
      mutation,
    });

    botToken = res.data.createBot;
    expect(botToken).toBeDefined();
  });

  it('Get current user as bot', async () => {
    const botClient = createClient('BOT ' + botToken);

    const query = gql`
      query {
        currentUser {
          username
        }
      }
    `;

    const res = await botClient.query({ query });

    expect(res.data.currentUser).toBeTruthy();
    expect(res.data.currentUser.username).toBe('testingBot');
  });
});
