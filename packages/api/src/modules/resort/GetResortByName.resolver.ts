import Resort from '@entities/Resort';
import { Arg, Query, Resolver } from 'type-graphql';

console.log('IGDdfsdf');

@Resolver()
export class GetUserByNameResolver {
  @Query(() => Resort, { nullable: true })
  getResortByName(@Arg('name') name: string) {
    return Resort.createQueryBuilder('resort')
      .where('LOWER(resort.name) = LOWER(:name)', { name })
      .getOne();
  }
}
