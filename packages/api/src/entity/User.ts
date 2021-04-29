import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity } from "../connection";
import Repo from "./Repo";
import Post from "./Post";
import { Relation } from "../connection/Relation";

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
  username: string;

  @Field()
  createdAt: string;

  @Field()
  verified: boolean;

  @Field(() => [Repo])
  @Relation({ multi: true })
  repos: any[];

  @Field(() => [Post])
  @Relation({ multi: true })
  posts: any[];
}
