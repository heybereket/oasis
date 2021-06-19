import { Field, InputType } from 'type-graphql';

@InputType()
export default class NewAnswerInput {
  @Field()
  content: string;
}
