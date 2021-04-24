import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity } from "../connection";
import User from "./User";

@ObjectType()
@Entity("repos")
export default class Repo extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  owner: User;
}
