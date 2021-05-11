import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import Post from '@entities/Post';
import User from '@entities/User';

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
  likes: number = 0;

  @Column()
  @Field(() => Int)
  dislikes: number = 0;

  @Column()
  @Field()
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastEdited: string;

  @Field(() => Post, { complexity: 1 })
  @ManyToOne(() => Post, (post) => post.comments)
  post: Promise<Post>;

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.comments)
  author: Promise<User>;
}
