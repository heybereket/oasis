import { Resolver, FieldResolver, Arg, Root } from 'type-graphql';
import {
  AdvancedOptions,
  ReturnTypeFunc,
} from 'type-graphql/dist/decorators/types';
import { BaseEntity } from 'typeorm';

export const allFieldResolvers = [];

export const RelationalPagination =
  (
    getTarget: () => typeof BaseEntity,
    typeFunc: ReturnTypeFunc,
    options: AdvancedOptions = {}
  ): PropertyDecorator =>
  (_, pk) => {
    const propKey = String(pk);

    console.log(typeFunc(), { options, propKey, pk });

    allFieldResolvers.push(() => {
      @Resolver(getTarget)
      class ResolverClass {
        @FieldResolver(typeFunc, { name: propKey, ...options })
        paginate(
          @Root() obj: BaseEntity & { id: string },
          @Arg('limit') limit: number,
          @Arg('offset') offset: number
        ) {
          const targetEntity = getTarget();
          const [valEntity] = typeFunc() as any as typeof BaseEntity[];

          const valName = valEntity.name.toLowerCase();
          const targetName = targetEntity.name.toLowerCase();

          console.log({ targetEntity, valEntity, valName, targetName });

          return valEntity
            .createQueryBuilder(valName)
            .innerJoin(
              `${valName}.${propKey}`,
              targetName,
              `${targetName}.id = :id`,
              {
                id: obj.id,
              }
            )
            .orderBy(`${valName}.id`)
            .skip(offset)
            .take(limit)
            .getMany();
        }
      }

      return ResolverClass;
    });
  };
