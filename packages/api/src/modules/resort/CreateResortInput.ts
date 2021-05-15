import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateResortInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  banner: string;

  @Field({ nullable: false })
  logo: string;

  @Field({ nullable: false })
  category: string;
}
