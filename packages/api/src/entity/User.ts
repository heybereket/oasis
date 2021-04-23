import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity } from "../connection";

@ObjectType()
@Entity("users")
export default class User extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  username: string;
}
