import { Arg, Query, Resolver } from 'type-graphql';
import { BaseEntity } from '../connection';

export const createBaseResolver = (
  suffix: string,
  entity: typeof BaseEntity
): any => {
  @Resolver()
  class BaseResolver {
    @Query({ name: `all${suffix}s` })
    all() {
      return entity.find();
    }

    @Query({ name: `paginate${suffix}s` })
    paginate(@Arg('limit') limit: number, @Arg('offset') offset: number) {
      return entity.paginate(limit, offset);
    }

    @Query({ name: `get${suffix}` })
    get(@Arg('id') id: string) {
      return entity.findOne(id);
    }
  }

  return BaseResolver;
};
