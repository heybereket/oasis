import { PremiumToken } from '@entities/PremiumToken';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export default class MakePremiumToken {
  @Mutation(() => String)
  async makePremiumToken(@Arg('time') time: number) {
    const token = PremiumToken.create({
      premiumTime: time,
    });

    await token.save();

    return token.id;
  }
}
