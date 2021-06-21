import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class EditQuestionInput {
  @Field({ nullable: true })
  @Length(1, 1000)
  message: string;

  @Field(() => [String], { nullable: true })
  topics: string[];
}
