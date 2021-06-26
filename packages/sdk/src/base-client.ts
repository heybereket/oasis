import { EventEmitter } from 'ee-ts';
import fetch from 'cross-fetch';
import { gqlURL } from '@oasis-sh/shared';
import {
  Notification,
  Post,
  User,
  Resort,
  Comment,
  Badge,
  Query,
} from './generated/types';
import { relations } from './generated/relations';
import { QueryBuilder } from './query-builder';

type EntityKey = 'badge' | 'comment' | 'post' | 'resort' | 'user' | 'bot';

interface EntityKeyMap {
  badge?: Badge;
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
  tokenType?: 'BOT' | 'VSC';
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
    const res = await fetch(`${gqlURL}/graphql`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        authorization: `${this.options.tokenType ?? 'BOT'} ${
          this.options.token
        }`,
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

    return extractor(data.data);
  }

  getSelections(key: string): string {
    const sels: string[] = this.options.selections?.[key] || [];

    const localRelations = relations[key];

    const str = sels
      .map((sel) => {
        if (!(sel in localRelations)) return sel;
        const otherType: string = localRelations[sel];

        return !otherType.endsWith('[]')
          ? this.getSelections(otherType)
          : `${sel} { hasMore, total, items { ${this.getSelections(
              otherType.slice(0, -2)
            )} } }`;
      })
      .join(', ');

    return str;
  }

  createQueryBuilder<T extends keyof Query>(resolver: T) {
    return new QueryBuilder(this, resolver);
  }
}
