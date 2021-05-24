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
import { BCEntity, BCField } from '@root/bot-client-gen';
import { PublicField } from '@utils/PublicField';

@ObjectType()
@Entity()
@BCEntity('comments')
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @BCField()
  id: string;

  @Column()
  @PublicField()
  content: string;

  @Column()
  @Field(() => Int)
  @BCField()
  likes = 0;

  @Column()
  @Field(() => Int)
  @BCField()
  dislikes = 0;

  @Column()
  @PublicField()
  createdAt: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  lastEdited: string;

  @Field(() => Post, { complexity: 1 })
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @BCField({ type: 'Post' })
  post: Promise<Post>;

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.comments)
  @BCField({ type: 'User' })
  author: Promise<User>;
}
