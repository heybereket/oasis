import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import User from '@entities/User';
import Comment from '@entities/Comment';
import Resort from '@entities/Resort';
import { RelationalPagination } from '@utils/RelationalPagination';
import { BCEntity, BCField } from '@root/bot-client-gen';
import { PublicField } from '@utils/PublicField';

@ObjectType()
@Entity()
@BCEntity('posts')
export default class Post extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  @Field(() => ID)
  @BCField()
  id: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  title: string;

  @Column()
  @PublicField()
  message: string;

  @Column()
  @PublicField()
  createdAt: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  lastEdited: string;

  @Column('simple-array')
  @Field(() => [String])
  @BCField({ type: 'string[]' })
  topics: string[];

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.posts)
  @BCField({ type: 'User' })
  author: Promise<User>;

  // @Field(() => User, { complexity: 1 })
  @RelationalPagination(() => Post, () => User, 'likedPosts')
  @ManyToMany(() => User, (user) => user.likedPosts)
  @BCField({ type: 'PaginationResponseType<User>' })
  likers: Promise<User[]>;

  @RelationalPagination(() => Post, () => User, 'dislikedPosts')
  @ManyToMany(() => User, (user) => user.dislikedPosts)
  @BCField({ type: 'PaginationResponseType<User>' })
  dislikers: Promise<User[]>;

  // @Field(() => [Comment], { complexity: 5 })
  @RelationalPagination(() => Post, () => Comment, 'post')
  @OneToMany(() => Comment, (comment) => comment.post)
  @BCField({ type: 'PaginationResponseType<User>' })
  comments: Promise<Comment[]>;

  @Field(() => Resort, { nullable: true, complexity: 1 })
  @ManyToOne(() => Resort, (resort) => resort.posts, { nullable: true })
  @BCField({ type: 'Resort', nullable: true })
  resort: Promise<Resort>;
}
