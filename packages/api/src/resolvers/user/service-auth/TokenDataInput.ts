import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TokenData {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
