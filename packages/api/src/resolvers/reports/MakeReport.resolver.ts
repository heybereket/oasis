import Comment from '@entities/Comment';
import Post from '@entities/Post';
import Report from '@entities/Report';
import Resort from '@entities/Resort';
import User from '@entities/User';
import { ContextType } from '@root/server';
import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import MakeReportInput from './MakeReportInput';
import ReportedEntityInput from './ReportedEntityInput';

@Resolver()
export class MakeReportResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async makeReport(
    @Ctx() { getUser }: ContextType,
    @Arg('reporteeData') reporteeData: ReportedEntityInput,
    @Arg('data') data: MakeReportInput
  ) {
    let reporteeUser: Promise<User>;
    let reporteePost: Promise<Post>;
    let reporteeComment: Promise<Comment>;
    let reporteeResort: Promise<Resort>;

    if (reporteeData.userId) {
      reporteeUser = Promise.resolve(await User.findOne(reporteeData.userId));
    }
    if (reporteeData.postId) {
      reporteePost = Promise.resolve(await Post.findOne(reporteeData.postId));
    }
    if (reporteeData.commentId) {
      reporteeComment = Promise.resolve(
        await Comment.findOne(reporteeData.commentId)
      );
    }
    if (reporteeData.resortId) {
      reporteeResort = Promise.resolve(
        await Resort.findOne(reporteeData.resortId)
      );
    }

    if ((await getUser()).id === reporteeData.userId) {
      throw new ApolloError("You can't report yourself.");
    }

    if (!reporteeUser && !reporteeComment && !reporteePost && !reporteeResort) {
      throw new ApolloError(
        'You need to specify at least one entity to report'
      );
    }

    const report = Report.create();
    Report.merge(report, data);

    report.resolved = false;
    report.reporter = Promise.resolve(await getUser());
    report.user = reporteeUser;
    report.post = reporteePost;
    report.comment = reporteeComment;
    report.resort = reporteeResort;
    report.createdAt = String(Date.now());

    report.save();
    return true;
  }
}
