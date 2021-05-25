import { Field, InputType } from 'type-graphql';

@InputType()
export default class EditPostInput {
  @Field({ nullable: true })
  message: string;

  @Field(() => [String], { nullable: true })
  topics: string[];
}
