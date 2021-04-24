import { BaseEntity, Entity } from "../connection";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity("posts")
export default class Post extends BaseEntity {
  @Field()
  id: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  dislikes: number;
}
