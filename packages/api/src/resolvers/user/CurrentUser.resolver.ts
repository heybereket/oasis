import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import User from '@entities/User';

// @bcg-resolver(query, currentUser, user)

@Resolver()
export default class CurrentUser {
  @Query(() => User, { nullable: true })
  @Authorized()
  currentUser(@Ctx() { getUser }: ContextType) {
    return getUser();
  }
}
