import Resort from '@entities/Resort';
import { Arg, Query, Resolver } from 'type-graphql';

// @bcg-resolver(query, getResortByName, resort)

@Resolver()
export class GetResortByNameResolver {
  @Query(() => Resort, { nullable: true })
  getResortByName(@Arg('name') name: string) {
    return Resort.createQueryBuilder('resort')
      .where('LOWER(resort.name) = LOWER(:name)', { name })
      .getOne();
  }
}
