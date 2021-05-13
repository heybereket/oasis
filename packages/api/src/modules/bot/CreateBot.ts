import User from '@entities/User';
import { ContextType } from '@root/apolloServer';
import { NoBot } from '@utils/auth/NoBot';
import { ApolloError } from 'apollo-server-express';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from 'type-graphql';

@InputType()
class CreateBotInput {
  @Field()
  username: string;

  @Field()
  name: string;
}

@Resolver()
export class CreateBotResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @NoBot()
  async createBot(
    @Arg('data') data: CreateBotInput,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const bot = User.create();

    bot.isBot = true;
    bot.avatar = user.avatar;

    const sameNameUser = await User.createQueryBuilder()
      .where('LOWER(username) = LOWER(:username)', { username: data.username })
      .getCount();
    if (sameNameUser !== 0) {
      return new ApolloError(
        'Username is taken please request a safe Username',
        'USERNAME_TAKEN'
      );
    }

    bot.username = data.username;
    bot.name = data.name || data.username;
    bot.createdAt = String(Date.now());
    bot.verified = user.verified;
    bot.roles = [];
    bot.repos = Promise.resolve([]);
    bot.posts = Promise.resolve([]);
    bot.comments = Promise.resolve([]);
    bot.badges = Promise.resolve([]);
    bot.botOwner = Promise.resolve(user);

    return true;
  }
}
