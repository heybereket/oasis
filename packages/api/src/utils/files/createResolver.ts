import { ApolloError } from 'apollo-server-express';
import { Arg, Query, Resolver } from 'type-graphql';
import { BaseEntity } from 'typeorm';

export const createResolver = (
  suffix: string,
  entity: typeof BaseEntity
): any => {
  @Resolver()
  class BaseResolver {
    @Query(() => [entity], {
      name: `paginate${suffix}s`,
      complexity: ({ args }) => args.limit,
    })
    paginate(
      @Arg('limit') limit: number,
      @Arg('offset') offset: number,
      @Arg('sortCol', { nullable: true }) sortCol?: string,
      @Arg('sortType', { nullable: true }) sortType?: string
    ) {
      if (sortType && sortType !== 'ASC' && sortType !== 'DESC') {
        throw new ApolloError('Sort type must be "DESC" or "ASC"');
      }
      const order = {};
      order[sortCol ?? 'id'] = sortType ?? 'DESC';

      return entity.find({
        skip: offset,
        take: limit,
        order,
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
