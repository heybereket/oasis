/* eslint-disable no-continue */
/* eslint-disable no-invalid-this */
import BaseClient from './base-client';
import { Mutation, Query } from './generated/types';
import { allMutations, Arguments } from './generated/allResolvers';
import { ArgLogic, ArgumentGQLTypes } from './generated/arguments';

type FieldTypesOf<T> = T extends any[] ? T[0] : T;

type SpecificFields<T, K, R> = {
  [P in keyof T]?: FieldTypesOf<T[P]> extends object
    ? SpecificFields<FieldTypesOf<T[P]>, P, T>
    : true;
} &
  ArgLogic<R, K>;

const recurse = (a: object, b: object) => {
  for (const key in b) {
    if (typeof b[key] === 'object') {
      recurse(a[key] || (a[key] = {}), b[key]);
    } else {
      a[key] = b[key];
    }
  }
};

type Resolvers = Query & Mutation;
type Field<T extends keyof Resolvers> = SpecificFields<
  FieldTypesOf<Resolvers[T]>,
  T,
  T extends keyof Mutation ? Mutation : Query
>;

export class QueryBuilder<T extends keyof Resolvers> {
  fields: Field<T>;
  constructor(public client: BaseClient, public resolver: T) {}

  addFields(newFields: Field<T>): QueryBuilder<T>;
  addFields(...properties: (keyof Resolvers[T])[]): QueryBuilder<T>;
  addFields(...a: any[]) {
    const args = a as (keyof Resolvers[T])[] | Field<T>[];
    const first = args[0];
    if (typeof first === 'string') {
      const a = args as (keyof Resolvers[T])[];

      this.fields = {
        ...this.fields,
        ...a.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      };

      return;
    }

    const obj = first as Field<T>;

    if (!this.fields) this.fields = obj;
    else recurse(this.fields, obj);

    return this;
  }

  send(vars?: any) {
    if (!this.fields) {
      throw new TypeError(
        'Cannot send request without fields. Did you forget to call `addFields` on the query builder?'
      );
    }

    let argIdx = 0;
    const args: any = {};
    const argTypes: any = {};
    const addArg = (val: any, type: string) => {
      const str = `OasisSdkArgs${argIdx++}`;
      args[str] = val;
      argTypes[str] = type;
      return str;
    };

    const queryStr = this.createQueryString(
      this.resolver,
      this.fields,
      [
        allMutations.includes(this.resolver) ? 'Mutation' : 'Query',
        this.resolver,
      ],
      addArg
    );

    return this.client.fetchGraphQL(
      `${allMutations.includes(this.resolver) ? 'mutation' : 'query'}${
        Object.keys(args).length > 0
          ? `(${Object.entries(argTypes)
              .map(([arg, type]) => `$${arg}: ${type}`)
              .join(', ')})`
          : ''
      } { ${queryStr} }`,
      (data) => data[this.resolver],
      { ...vars, ...args }
    );
  }

  createQueryString(
    res: string,
    obj: object & { ARGS?: any },
    trail: string[],
    addArg: (val: string, type: string) => string
  ) {
    const arr = [];

    for (const key in obj) {
      if (key === 'ARGS') continue;
      const val = obj[key];
      arr.push(
        typeof val === 'object'
          ? this.createQueryString(key, val, [...trail, key], addArg)
          : key
      );
    }

    return `${res}${
      'ARGS' in obj
        ? `(${Object.keys(obj.ARGS).map(
            (key) =>
              `${key}: $${addArg(
                obj.ARGS[key],
                trail.reduce((acc: any, key: string, i: number) => {
                  const obj =
                    acc[key] || ArgumentGQLTypes[acc.__returns__][key];
                  return obj;
                }, ArgumentGQLTypes as any)[key]
              )}`
          )})`
        : ''
    } { ${arr.join(', ')} }`;
  }
}
