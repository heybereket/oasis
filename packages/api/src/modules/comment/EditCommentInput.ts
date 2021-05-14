import { Field, InputType } from 'type-graphql';

@InputType()
export default class EditCommentInput {
  @Field()
  content: string;
}
