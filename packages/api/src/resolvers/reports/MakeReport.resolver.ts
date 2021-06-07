import Report from '@entities/Report';
import User from '@entities/User';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import MakeReportInput from './MakeReportInput';

@Resolver()
export class MakeReportResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async makeReport(
    @Ctx() { getUser }: ContextType,
    @Arg('reporteeId') reporteeId: string,
    @Arg('data') data: MakeReportInput
  ) {
    const reportee = await User.findOne(reporteeId);
    if (!reportee) throw new ApolloError('That person does not exist.');
    if ((await getUser()).id === reporteeId) throw new ApolloError("You can't report yourself.");
    const report = Report.create();
    Report.merge(report, data);

    report.resolved = false;
    report.reporter = Promise.resolve(await getUser());
    report.reportee = Promise.resolve(reportee);
    report.createdAt = String(Date.now());

    report.save();
    return true;
  }
}
