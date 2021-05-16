import { Resolver, FieldResolver, Arg, Root } from 'type-graphql';
import {
  AdvancedOptions,
  ReturnTypeFunc,
} from 'type-graphql/dist/decorators/types';
import { BaseEntity } from 'typeorm';
import { PaginatedResponse, IPaginatedResponse } from './PaginationResponse';

export const allFieldResolvers = [];

export const RelationalPagination =
  (
    getTarget: () => typeof BaseEntity,
    typeFunc: ReturnTypeFunc,
    otherSideKey: String,
    options: AdvancedOptions = {}
  ): PropertyDecorator =>
  (_, pk) => {
    const [valEntity] = typeFunc() as any as typeof BaseEntity[];
    const PaginatedItemResponse = PaginatedResponse(valEntity);
    type PaginatedItemResponse = InstanceType<typeof PaginatedItemResponse>;
    const propKey = String(pk);

    allFieldResolvers.push(() => {
      @Resolver(getTarget)
      class ResolverClass {
        @FieldResolver(() => PaginatedItemResponse, {
          name: propKey,
          ...options,
        })
        async paginate(
          @Root() obj: BaseEntity & { id: string },
          @Arg('limit') limit: number,
          @Arg('offset') offset: number
        ): Promise<IPaginatedResponse> {
          const targetEntity = getTarget();

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
        }
      }

      return ResolverClass;
    });
  };
