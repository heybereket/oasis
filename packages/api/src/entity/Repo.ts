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
    if (!parent._owner) return null;

    const snap = await parent._owner.get();
    return { id: snap.id, ...snap.data() };
  }
}
