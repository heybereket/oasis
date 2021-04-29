import { getRefData } from "../utils/getRefData";
import { Field, ID, ObjectType, Root } from "type-graphql";
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

  @Field(() => [Repo])
  @Relation({ multi: true })
  posts: any[];
}
