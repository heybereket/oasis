import { Arg, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";

export const createResolver = (
  suffix: string,
  entity: typeof BaseEntity
): any => {
  @Resolver()
  class BaseResolver {
    @Query(() => [entity], { name: `all${suffix}s` })
    all() {
      return entity.find();
    }

    // @Query(() => [entity], { name: `paginate${suffix}s` })
    // paginate(@Arg("limit") limit: number, @Arg("offset") offset: number) {
    //   return entity.
    // }

    @Query(() => entity, { name: `get${suffix}` })
    get(@Arg("id") id: string) {
      return entity.findOne(id);
    }
  }

  return BaseResolver;
};
