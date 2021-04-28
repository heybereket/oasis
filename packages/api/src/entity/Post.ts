import { BaseEntity, Entity } from "../connection";
import { Field, Int, ObjectType, Root } from "type-graphql";
import User from "./User";
import Comment from "./Comment";
import { getRefData } from "../utils/getRefData";

@ObjectType()
@Entity("posts")
export default class Post extends BaseEntity {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  dislikes: number;

  @Field(() => [String])
  topics: string[];

  _author: FirebaseFirestore.DocumentReference;
  _comments: FirebaseFirestore.DocumentReference[];

  @Field(() => User)
  async author(@Root() parent: Post) {
    return getRefData(parent._author);
  }

  @Field(() => [Comment])
  async comments(@Root() parent: Post) {
    return parent._comments
      ? Promise.all(parent._comments.map(getRefData))
      : [];
  }
}
