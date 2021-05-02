import { BaseEntity, Entity } from '../connection';
import { Field, Int, ObjectType } from 'type-graphql';
import Post from './Post';
import User from './User';

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
  post: any;

  @Field(() => User)
  author: any;
}
