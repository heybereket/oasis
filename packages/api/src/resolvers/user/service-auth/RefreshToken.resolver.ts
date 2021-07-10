import User from '@entities/User';
import { ApolloError } from 'apollo-server-express';
import { sign, verify } from 'jsonwebtoken';
import { Mutation, Resolver, Arg } from 'type-graphql';

@Resolver()
export default class RefreshTokenResolvers {
  @Mutation(() => String)
  async refreshToken(
    @Arg('refreshToken') refreshToken: string
  ): Promise<string> {
    try {
      const data = verify(
        refreshToken,
        process.env.VSCODE_REFRESH_TOKEN_SECRET
      ) as any;

      const { uid } = data;
      const user = await User.findOne(uid);

      const newAccessToken = sign(
        { uid, count: ++user.vscTokenCount },
        process.env.VSCODE_ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      await user.save();
      return newAccessToken;
    } catch (e) {
      throw new ApolloError('Invalid Refresh Token!');
    }
  }
}
