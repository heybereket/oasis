import { Query, Arg, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import User from '../../entities/User';

@Resolver()
export class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg('username') username: string) {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .leftJoinAndSelect('user.posts', 'post')
      .getOne();
  }
}
