import { getRefData } from "../utils/getRefData";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Entity } from "../connection";
import Repo from "./Repo";
import Post from "./Post";

const deserialize = (orig: any) => ({
  ...orig,
  ...orig.sensitiveData,
  ...orig.extraData,
});

@ObjectType()
@Entity("users", { deserialize })
export default class User extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username: string;

  _repos: FirebaseFirestore.DocumentReference[];
  _posts: FirebaseFirestore.DocumentReference[];

  @Field(() => [Repo], { nullable: true })
  async repos(@Root() parent: User) {
    return parent._repos ? Promise.all(parent._repos.map(getRefData)) : [];
  }

  @Field(() => [Post])
  async posts(@Root() parent: User) {
    return parent._posts ? Promise.all(parent._posts.map(getRefData)) : [];
  }
}
