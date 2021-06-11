import { InputType, Field } from 'type-graphql';

@InputType()
export default class ReportedEntityInput {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  postId?: string;

  @Field(() => String, { nullable: true })
  commentId?: string;

  @Field(() => String, { nullable: true })
  resortId?: string;
}
