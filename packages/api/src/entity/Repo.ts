import { getRefData } from "src/utils/getRefData";
import { Field, ID, ObjectType, Root } from "type-graphql";
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

  _owner: FirebaseFirestore.DocumentReference;

  @Field(() => User, { nullable: true })
  async owner(@Root() parent: Repo) {
    return parent._owner ? getRefData(parent._owner) : null;
  }
}
