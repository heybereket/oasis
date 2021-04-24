import { BaseEntity, Entity } from "../connection";
import { Field, Int, ObjectType, Root } from "type-graphql";
import User from "./User";
import { getRefData } from "../utils/getRefData";

@ObjectType()
@Entity("posts")
export default class Post extends BaseEntity {
  @Field()
  id: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  dislikes: number;

  _author: FirebaseFirestore.DocumentReference;

  @Field(() => User)
  async author(@Root() parent: Post) {
    return getRefData(parent._author);
  }
}
