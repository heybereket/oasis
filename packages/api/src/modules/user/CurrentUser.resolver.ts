import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import User from '@entities/User';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export class CurrentUser {
  @Query(() => User, { nullable: true })
  @Authorized()
  @BCQuery('users', 'User')
  currentUser(@Ctx() { getUser }: ContextType) {
    return getUser();
  }
}
