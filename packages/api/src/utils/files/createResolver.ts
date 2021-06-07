import { Arg, Query, Resolver } from 'type-graphql';
import { BaseEntity } from 'typeorm';

export const createResolver = (
  suffix: string,
  entity: typeof BaseEntity
): any => {
  const entityKey = entity.name.toLowerCase() + 's';
  @Resolver()
  class BaseResolver {
    @Query(() => [entity], {
      name: `paginate${suffix}s`,
      complexity: ({ args }) => args.limit,
    })
    paginate(@Arg('limit') limit: number, @Arg('offset') offset: number) {
      return entity.find({
        skip: offset,
        take: limit,
      });
    }

    @Query(() => entity, {
      name: `get${suffix}`,
      complexity: ({ args }) => args.limit,
    })
    get(@Arg('id') id: string) {
      return entity.findOne(id);
    }
  }

  return BaseResolver;
};
