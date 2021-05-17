import { mapping } from '@utils/RelationalPagination';
import { Arg, FieldResolver, Resolver, Root } from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { IPaginatedResponse, PaginatedResponse } from './PaginationResponse';
import { __decorate, __param, __metadata } from 'tslib';

let a = 0,
  b = 0;

const param =
  (i: number, decorator: ParameterDecorator) => (target: any, key: any) =>
    decorator(target, key, i);

console.log(mapping);

for (const [getTargetEntity, obj] of mapping) {
  let ResolverClass = class ResolverClass {};
  for (const [prop, { getValEntity, otherSideKey, options }] of Object.entries(
    obj
  )) {
    console.log({ prop, getValEntity, otherSideKey, options });
    const getPaginatedItemResponse = () =>
      PaginatedResponse(getValEntity().name, getValEntity);

    const funcName = `XYZ${a++}`;
    ResolverClass.prototype[funcName] = async function (
      obj: BaseEntity & { id: string },
      limit: number,
      offset: number
    ): Promise<IPaginatedResponse<BaseEntity>> {
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

    console.log(ResolverClass.prototype[funcName]);

    __decorate(
      [
        FieldResolver(
          () => {
            const p = getPaginatedItemResponse();
            console.log({ p });
            return p;
          },
          {
            name: prop,
            ...options,
          }
        ),
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
