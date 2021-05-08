import { Field, InputType } from 'type-graphql';

@InputType()
export default class NewCommentInput {
  @Field({ nullable: false })
  content: string;
}
