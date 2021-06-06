import Report from '@entities/Report';
import User from '@entities/User';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import MakeReportInput from './MakeReportInput';
import { ReportType } from './ReportTypes';

@Resolver()
export class MakeReportResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async makeReport(
    @Ctx() { getUser }: ContextType,
    @Arg('accuseId') accuseId: string,
    @Arg('data') data: MakeReportInput
  ) {
    const accuse = await User.findOne(accuseId);
    if (!accuse) throw new ApolloError('There is no person like that.');
    const report = Report.create();
    Report.merge(report, data);

    report.resolved = false;
    report.reporter = Promise.resolve(await getUser());
    report.accuse = Promise.resolve(accuse);
    report.createdAt = String(Date.now());

    report.save();
    return true;
  }
}
