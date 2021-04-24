import { getRefData } from "../utils/getRefData";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Entity } from "../connection";
import Repo from "./Repo";
import Post from "./Post";

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
  _posts: FirebaseFirestore.DocumentReference[];

  @Field(() => [Repo], { nullable: true })
  async repos(@Root() parent: User) {
    if (!parent._repos) return;

    return Promise.all(parent._repos.map(getRefData));
  }

  @Field(() => [Post], { nullable: true })
  async posts(@Root() parent: User) {
    console.log(parent);

    if (!parent._posts) return;

    return Promise.all(parent._posts.map(getRefData));
  }
}
