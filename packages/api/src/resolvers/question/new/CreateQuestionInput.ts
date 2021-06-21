import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateQuestionInput {
  @Field({ nullable: false })
  @Length(1, 1000)
  message: string;

  @Field(() => [String], { nullable: false })
  topics: string[];
}
