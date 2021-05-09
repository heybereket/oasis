import { Field, InputType } from 'type-graphql';

@InputType()
export default class NewCommentInput {
  @Field()
  content: string;
}
