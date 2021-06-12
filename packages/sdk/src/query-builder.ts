/* eslint-disable no-invalid-this */
import BaseClient from './base-client';
import { Mutation, Query } from './generated/types';
import { allMutations, Arguments } from './generated/allResolvers';

// type SpecificFields<F, T extends { [P in keyof F]: any }> = {
//   [P in keyof F]: F[P] extends true
//     ? T[P]
//     : F[P] extends object
//     ? SpecificFields<F[P], T[P]>
//     : undefined;
// };

type SpecificFields<T> = { [P in keyof T]?: true | SpecificFields<T[P]> };

const recurse = (a: object, b: object) => {
  for (const key in b) {
    if (typeof b[key] === 'object') {
      recurse(a[key] || (a[key] = {}), b[key]);
    } else {
      a[key] = b[key];
    }
  }
};

const createQueryString = (obj: object) => {
  const arr = [];

  for (const key in obj) {
    const val = obj[key];
    arr.push(
      typeof val === 'object' ? `${key} { ${createQueryString(val)} }` : key
    );
  }

  return arr.join(', ');
};

type Resolvers = Query & Mutation;
export class QueryBuilder<T extends keyof Resolvers> {
  fields: SpecificFields<Resolvers[T]>;
  constructor(public client: BaseClient, public resolver: T) {}

  addFields(newFields: SpecificFields<Resolvers[T]>): QueryBuilder<T>;
  addFields(...newFields: (keyof Resolvers[T])[]): QueryBuilder<T> {
    if (typeof newFields[0] !== 'object') {
      if (!this.fields) this.fields = {};
      for (const field of newFields) {
        this.fields[field] = true;
      }
    }

    const obj = newFields[0] as any as SpecificFields<Resolvers[T]>;

    if (!this.fields) this.fields = obj;
    else recurse(this.fields, obj);

    return this;
  }

  send: T extends keyof Arguments
    ? (vars: Arguments[T]) => Promise<Resolvers[T]>
    : () => Promise<Resolvers[T]> = ((vars: any = {}) => {
    if (!this.fields) {
      throw new TypeError(
        'Cannot send request without fields. Did you forget to call `addFields` on the query builder?'
      );
    }

    return this.client.fetchGraphQL(
      `${allMutations.includes(this.resolver) ? 'mutation' : 'query'} ${
        this.resolver
      } { ${createQueryString(this.fields)} }`,
      (a) => a,
      vars
    );
  }) as any;
}
