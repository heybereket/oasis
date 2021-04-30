import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from '../connection';
import Repo from './Repo';
import Post from './Post';
import { Relation } from '../connection/Relation';

const deserialize = (orig: any) => ({
  ...orig,
  ...orig.sensitiveData,
  ...orig.extraData,
});

@ObjectType()
@Entity('users', { deserialize })
export default class User extends BaseEntity {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  username_lower: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  verified: boolean;

  @Field(() => [Repo], { nullable: true })
  @Relation(Repo, { multi: true })
  repos: any[];

  @Field(() => [Post], { nullable: true })
  @Relation(Post, { multi: true })
  posts: any[];
}
