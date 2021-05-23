import { EventEmitter } from 'ee-ts';
import fetch from 'node-fetch';
import { API_BASE_URL } from './constants';

export type Events = {};

export type Options = {
  token: string;
};

export default class BaseClient extends EventEmitter<Events> {
  constructor(public options: Options) {
    super();
  }

  async fetchGraphQL<T = any, R = any>(
    query: string,
    extractor: (data: R) => T = (d: any) => d,
    variables: { [key: string]: any } = {}
  ): Promise<T> {
    const res = await fetch(`${API_BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        authorization: `Bearer BOT ${this.options.token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await res.json();

    if (data.errors) {
      throw new Error(
        `GraphQL Returned Error: ${data.errors
          .map((err) => JSON.stringify(err))
          .join(', \n')}`
      );
    }

    return extractor(data);
  }

  getSelection(_: string) {
    return [];
  }
}
