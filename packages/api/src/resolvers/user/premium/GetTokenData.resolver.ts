import { PremiumToken } from '@entities/PremiumToken';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export default class TokenData {
  @Mutation(() => PremiumToken)
  async getTokenData(@Arg('tokenId') tokenId: string) {
    return PremiumToken.findOne(tokenId);
  }
}
