import { ContextType } from '@root/server';
import { ApolloError } from 'apollo-server-express';
import { sign, verify } from 'jsonwebtoken';
import { Authorized, Mutation, Resolver, Ctx, Arg } from 'type-graphql';

@Resolver()
export class RefreshTokenResolvers {
  @Mutation(() => String)
  @Authorized()
  async refreshToken(
    @Arg('refreshToken') refreshToken: string,
    @Ctx() { uid, getUser }: ContextType
  ): Promise<string> {
    const user = await getUser();

    try {
      const data = verify(
        refreshToken,
        process.env.VSCODE_REFRESH_TOKEN_SECRET
      ) as any;

      if (data.uid === uid) {
        const newAccessToken = sign(
          { uid, count: ++user.vscTokenCount },
          process.env.VSCODE_ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        await user.save();
        return newAccessToken;
      }
    } catch (e) {
      throw new ApolloError('Invalid Refresh Token!');
    }
  }
}
