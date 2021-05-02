import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from '../connection';
import Repo from './Project';
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
  @Field(() => ID)
  id: string;

  @Field()
  avatar: string;

  @Field({ nullable: true })
  banner: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  createdAt: string;

  @Field()
  github: string;

  @Field({ nullable: true })
  twitter: string;

  @Field({ nullable: true })
  url: string;

  @Field()
  verified: boolean;

  @Field(() => [Repo], { nullable: true })
  @Relation('Repo')
  repos: any[];

  @Field(() => [Post], { nullable: true })
  @Relation('Post')
  posts: any[];
}
