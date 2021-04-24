import { BaseEntity, Entity } from "../connection";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity("comments")
export default class Comment extends BaseEntity {
  @Field()
  id: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  dislikes: number;
}
