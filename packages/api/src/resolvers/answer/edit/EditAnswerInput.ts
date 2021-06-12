import { Field, InputType } from 'type-graphql';

@InputType()
export default class EditAnswerInput {
  @Field()
  content: string;
}
