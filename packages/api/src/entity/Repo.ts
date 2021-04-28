import { getRefData } from "../utils/getRefData";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Entity } from "../connection";
import User from "./User";
import { firestore } from "firebase-admin";

@ObjectType()
@Entity("repos", {
  deserialize: (orig: Repo) => ({
    ...orig,
    date_added: orig.date_added.toMillis().toString(),
  }),
})
export default class Repo extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  active: boolean;

  @Field()
  name: string;

  @Field()
  full_name: string;

  @Field()
  github_owner: string;

  @Field()
  issues: number;

  @Field()
  desc: string;

  @Field()
  language: string;

  @Field()
  stars: number;

  @Field()
  url: string;

  @Field(() => String, {
    description:
      "Time when the repo was added (the number of milliseconds passed since Unix epoch 1970-01-01T00:00:00Z)",
  })
  date_added: firestore.Timestamp;

  _owner: firestore.DocumentReference;

  @Field(() => User, { nullable: true })
  async owner(@Root() parent: Repo) {
    return parent._owner ? getRefData(parent._owner) : null;
  }
}
