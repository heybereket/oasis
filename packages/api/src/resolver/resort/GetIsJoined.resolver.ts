import Resort from '@entity/Resort';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Resort)
export class PaginateResortMembersResolver {
  @FieldResolver(() => Boolean)
  async isJoined(
    @Root() resort: Resort,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.joinedResorts).forEach((res) => {
        if (res.id === resort.id) {
          retValue = true;
        }
      });
      return retValue;
    } else {
      return false;
    }
  }
}
