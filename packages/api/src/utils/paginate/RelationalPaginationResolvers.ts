import { mapping } from '@utils/paginate/RelationalPagination';
import { Arg, FieldResolver, Resolver, Root } from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { PaginatedResponse } from './PaginationResponse';
import { __decorate, __param, __metadata } from 'tslib';
import { ApolloError } from 'apollo-server-express';

let a = 0;
let b = 0;

for (const [getTargetEntity, obj] of mapping) {
  let ResolverClass = class ResolverClass {};
  for (const keys of Object.entries(obj)) {
    const [prop, { getValEntity, otherSideKey, options }] = keys as any;
    const valEntity = getValEntity();
    const paginatedReponse = PaginatedResponse<typeof valEntity>(
      valEntity,
      getTargetEntity(),
      otherSideKey
    );

    const funcName = `XYZ${a++}`;
    ResolverClass.prototype[funcName] = async (
      obj: BaseEntity & { id: string },
      limit: number,
      offset: number,
      sortCol: string | undefined,
      sortType: string | undefined
    ) => {
      const valEntity = getValEntity();

      if (sortType && sortType !== 'ASC' && sortType !== 'DESC') {
        throw new ApolloError('Sort type must be "DESC" or "ASC"');
      }

      const query = valEntity
        .createQueryBuilder('root')
        .innerJoin(`root.${otherSideKey}`, 'vals', 'vals.id = :id', {
          id: obj.id,
        })
        .orderBy(`root.${sortCol ?? 'id'}`, sortType ?? 'ASC');

      const items = await query.skip(offset).take(limit).getMany();
      const total = await query.getCount();
      const hasMore = offset + limit < total;

      return {
        items,
        total,
        hasMore,
      };
    };

    Reflect.defineProperty(ResolverClass.prototype[funcName], 'name', {
      value: funcName,
    });

    __decorate(
      [
        FieldResolver(() => paginatedReponse, {
          name: prop,
          ...options,
        }),
        __param(0, Root()),
        __param(1, Arg('limit')),
        __param(2, Arg('offset')),
        __param(
          3,
          Arg('sortCol', () => String, { nullable: true })
        ),
        __param(
          4,
          Arg('sortType', () => String, { nullable: true })
        ),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Number, Number]),
        __metadata('design:returntype', Promise),
      ],
      ResolverClass.prototype,
      funcName,
      null
    );
  }

  ResolverClass = __decorate([Resolver(getTargetEntity)], ResolverClass) as any;

  exports[`Resolver${b++}`] = ResolverClass;
}
