import { EventEmitter } from 'ee-ts';
import fetch from 'node-fetch';
import { API_BASE_URL } from './constants';
import {
  Notification,
  Post,
  User,
  Resort,
  Comment,
  Repo,
  Badge,
} from './generated/types';

type EntityKey =
  | 'badge'
  | 'comment'
  | 'post'
  | 'repo'
  | 'resort'
  | 'user'
  | 'bot';

interface EntityKeyMap {
  badge?: Badge;
  repo?: Repo;
  comment?: Comment;
  resort?: Resort;
  post?: Post;
  notification?: Notification;
  user?: User;
  bot?: User;
}

export type Selections = { [P in EntityKey]?: (keyof EntityKeyMap[P])[] };

export type Events = {};

export type Options = {
  token: string;
  selections?: Selections;
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

  getSelections(key: string) {
    const sels = this.options.selections?.[key] || [];

    return sels;
  }
}
