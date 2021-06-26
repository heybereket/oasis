import { ContextType } from '@root/server';
import { sign } from 'jsonwebtoken';
import { Authorized, Mutation, Resolver, Ctx } from 'type-graphql';
import { TokenData } from './TokenDataInput';

@Resolver()
export class CreateTokensResolvers {
  @Mutation(() => TokenData)
  @Authorized()
  createTokens(@Ctx() { uid }: ContextType): TokenData {
    return {
      accessToken: sign(
        { uid, count: 0 },
        process.env.VSCODE_ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      ),
      refreshToken: sign({ uid }, process.env.VSCODE_REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
      }),
    };
  }
}
