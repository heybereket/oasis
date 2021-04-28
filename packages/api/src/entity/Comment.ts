import { BaseEntity, Entity } from "../connection";
import { Field, Int, ObjectType, Root } from "type-graphql";
import Post from "./Post";
import { getRefData } from "../utils/getRefData";
import User from "./User";

@ObjectType()
@Entity("comments")
export default class Comment extends BaseEntity {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  dislikes: number;

  _post: FirebaseFirestore.DocumentReference;
  _author: FirebaseFirestore.DocumentReference;

  @Field(() => Post)
  async post(@Root() parent: Comment) {
    return getRefData(parent._post);
  }

  @Field(() => User)
  async author(@Root() parent: Post) {
    return getRefData(parent._author);
  }
}
