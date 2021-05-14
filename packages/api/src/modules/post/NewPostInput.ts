import { Field, InputType } from 'type-graphql';

@InputType()
export default class NewPostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  message: string;

  @Field(() => [String], { nullable: false })
  topics: string[];
}
