import { BaseEntity, Entity } from "../connection";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./User";
import Comment from "./Comment";
import { Relation } from "../connection/Relation";

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

  @Field(() => User)
  @Relation()
  author: any;

  @Field(() => [Comment])
  @Relation({ multi: true })
  comments: any[];
}
