import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import User from '@entities/User';
import { Role } from '@enums/Roles';
import { ApolloError } from 'apollo-server-errors';
import { verify } from 'jsonwebtoken';
import { PremiumToken } from '@entities/PremiumToken';

@Resolver()
export default class RedeemToken {
  @Mutation(() => Boolean)
  @Authorized()
  async redeemPremium(
    @Arg('tokenId') tokenId: string,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const token = await PremiumToken.findOne(tokenId);

    user.premiumExiration = (
      (!Number.isNaN(Number.parseInt(user.premiumExiration))
        ? Number.parseInt(user.premiumExiration)
        : Date.now()) + token.premiumTime
    ).toString();

    user.save();

    return true;
  }
}
