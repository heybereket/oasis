import { mapping } from '@utils/RelationalPagination';
import { Arg, FieldResolver, Resolver, Root } from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { PaginatedResponse } from './PaginationResponse';
import { __decorate, __param, __metadata } from 'tslib';

let a = 0,
  b = 0;

for (const [getTargetEntity, obj] of mapping) {
  let ResolverClass = class ResolverClass {};
  for (const keys of Object.entries(obj)) {
    const [prop, { getValEntity, otherSideKey, options }] = keys as any;
    const valEntity = getValEntity();
    const paginatedReponse = PaginatedResponse<typeof valEntity>(valEntity);

    const funcName = `XYZ${a++}`;
    ResolverClass.prototype[funcName] = async function (
      obj: BaseEntity & { id: string },
      limit: number,
      offset: number
    ) {
      const valEntity = getValEntity();
      const targetEntity = getTargetEntity();

      const valName = valEntity.name.toLowerCase();
      const targetName = targetEntity.name.toLowerCase();

      const query = valEntity
        .createQueryBuilder(valName)
        .innerJoin(
          `${valName}.${otherSideKey}`,
          targetName,
          `${targetName}.id = :id`,
          {
            id: obj.id,
          }
        )
        .orderBy(`${valName}.id`);

      const items = await query.skip(offset).take(limit).getMany();
      const total = await query.getCount();
      const hasMore = offset + limit < total;

      return {
        items,
        total,
        hasMore,
      };
    };

    Object.defineProperty(ResolverClass.prototype[funcName], 'name', {
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
