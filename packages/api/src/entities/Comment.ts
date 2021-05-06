import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import Post from './Post';
import User from './User';

@ObjectType()
@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field(() => Int)
  likes: number;

  @Column()
  @Field(() => Int)
  dislikes: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Promise<Post>;

  @Field(() => User)
  @ManyToOne(() => Post, (user) => user.comments)
  author: Promise<User>;
}
