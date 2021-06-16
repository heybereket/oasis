import User from '@entities/User';
import { ContextType } from '@root/server';
import { NoBot } from '@utils/auth/NoBot';
import { ApolloError } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from 'type-graphql';
import { generatedNumber } from '@utils/index';
import { sign } from 'jsonwebtoken';

@Resolver()
export class RefreshBotTokenResolver {
  @Mutation(() => String)
  @Authorized()
  @NoBot()
  async refreshBotToken(
    @Arg('botId') botId: string,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const bot = await User.findOne(botId);

    if (!bot) throw new ApolloError('Bot Not Found');
    if ((await bot.botOwner).id !== user.id) {
      throw new ApolloError('This bot is not your bot!');
    }

    const tokenId = uuidv4();
    bot.botTokenId = tokenId;

    const { id: uid } = await bot.save();

    return sign({ uid, tokenId }, process.env.BOT_TOKEN_SECRET);
  }
}
