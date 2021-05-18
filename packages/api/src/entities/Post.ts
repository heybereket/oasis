import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import User from '@entities/User';
import Comment from '@entities/Comment';
import Resort from '@entities/Resort';
import { RelationalPagination } from '@utils/RelationalPagination';

@ObjectType()
@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  message: string;

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

  @Column('simple-array')
  @Field(() => [String])
  topics: string[];

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.posts)
  author: Promise<User>;

  // @Field(() => [Comment], { complexity: 5 })
  @RelationalPagination(() => Post, () => Comment, 'post')
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Promise<Comment[]>;

  @Field(() => Resort, { nullable: true, complexity: 1 })
  @ManyToOne(() => Resort, (resort) => resort.posts, { nullable: true })
  resort: Promise<Resort>;
}
