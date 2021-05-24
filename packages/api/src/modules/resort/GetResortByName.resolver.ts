import Resort from '@entities/Resort';
import { BCQuery } from '@root/bot-client-gen';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetResortByNameResolver {
  @Query(() => Resort, { nullable: true })
  @BCQuery('resort', 'Resort')
  getResortByName(@Arg('name') name: string) {
    return Resort.createQueryBuilder('resort')
      .where('LOWER(resort.name) = LOWER(:name)', { name })
      .getOne();
  }
}
