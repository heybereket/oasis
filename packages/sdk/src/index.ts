/* eslint-disable no-invalid-this */
import BaseClient from './base-client';
import { EditAnswerInput, MakeOptional } from './generated/types';
import { Field, ResolverKeys } from './query-builder';

export class Client extends BaseClient {
  answer = {
    edit: (answerId: string, data: EditAnswerInput) => {
      return this.createQueryBuilder('editAnswer')
        .addFields({
          ARGS: {
            answerId,
            data,
          },
        })
        .send();
    },
    paginate: (
      limit: number,
      offset: number,
      fieldData?:
        | ResolverKeys<'paginateAnswers'>
        | MakeOptional<Field<'paginateAnswers'>, 'ARGS'>
    ) => {
      return this.createQueryBuilder('paginateAnswers')
        .addFields({
          ARGS: {
            limit,
            offset,
          },
        })
        .addFields(fieldData as any)
        .send();
    },
  };
}
