import { BaseEntity, Entity } from '../connection';
import { Field, Int, ObjectType } from 'type-graphql';
import Post from './Post';
import User from './User';
import { Relation } from '../connection/Relation';

@ObjectType()
@Entity('comments')
export default class Comment extends BaseEntity {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  dislikes: number;

  @Field(() => Post)
  @Relation('Post')
  post: any;

  @Field(() => User)
  @Relation('User')
  author: any;
}
