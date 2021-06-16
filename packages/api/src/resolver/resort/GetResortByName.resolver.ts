import Resort from '@root/entity/Resort';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetResortByNameResolver {
  @Query(() => Resort, { nullable: true })
  getResortByName(@Arg('name') name: string) {
    return Resort.createQueryBuilder('resort')
      .where('LOWER(resort.name) = LOWER(:name)', { name })
      .getOne();
  }
}
