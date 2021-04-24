import { getRefData } from "src/utils/getRefData";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Entity } from "../connection";
import Repo from "./Repo";

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

  _repos: FirebaseFirestore.DocumentReference[];

  @Field(() => [Repo], { nullable: true })
  async repos(@Root() parent: User) {
    if (!parent._repos) return;

    return Promise.all(parent._repos.map(getRefData));
  }
}
