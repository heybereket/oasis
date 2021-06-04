import Report from '@entities/Report';
import { Role } from '@modules/user/Roles';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class MarkAsResolvedResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async markAsResolved(
    @Ctx() { getUser }: ContextType,
    @Arg('reportId') reportId: string,
    @Arg('resolved') resolved: boolean
  ) {
    const user = await getUser();

    // if (!user.roles.includes(Role.Moderator)) {
    //   throw new ApolloError("You don't have permission to do that!");
    // }

    const report = await Report.findOne(reportId);
    report.resolved = resolved;
    report.save();

    return true;
  }
}
