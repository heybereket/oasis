import { Field, InputType } from 'type-graphql';

@InputType()
export default class MakeBadgeInput {
  @Field()
  name: string;

  @Field()
  imagePath: string;

  @Field()
  level: number;

  @Field()
  description: string;
}
