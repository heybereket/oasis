import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import Post from '@entities/Post';
import User from '@entities/User';
import { RelationalPagination } from '@utils/RelationalPagination';

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
  @Field()
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastEdited: string;

  @Field(() => Post, { complexity: 1 })
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Promise<Post>;

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.comments)
  author: Promise<User>;

  @RelationalPagination(() => Comment, () => User, 'likedComments')
  @ManyToMany(() => User, (user) => user.likedComments)
  likers: Promise<User[]>;

  @RelationalPagination(() => Comment, () => User, 'dislikedComments')
  @ManyToMany(() => User, (user) => user.dislikedComments)
  dislikers: Promise<User[]>;
}
