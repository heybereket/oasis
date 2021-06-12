import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import User from '@entities/User';
import Comment from '@entities/Comment';
import Resort from '@entities/Resort';
import { RelationalPagination } from '@utils/paginate/RelationalPagination';
import Report from './Report';

@ObjectType()
@Entity()
export default class Post extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  message: string;

  @Column()
  @Field()
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastEdited?: string;

  @Column('simple-array')
  @Field(() => [String])
  topics: string[];

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.posts)
  author: Promise<User>;

  // @Field(() => User, { complexity: 1 })
  @RelationalPagination(() => Post, () => User, 'likedPosts')
  @ManyToMany(() => User, (user) => user.likedPosts)
  likers: Promise<User[]>;

  @RelationalPagination(() => Post, () => User, 'dislikedPosts')
  @ManyToMany(() => User, (user) => user.dislikedPosts)
  dislikers: Promise<User[]>;

  // @Field(() => [Comment], { complexity: 5 })
  @RelationalPagination(() => Post, () => Comment, 'post')
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Promise<Comment[]>;

  @Field(() => Resort, { nullable: true, complexity: 1 })
  @ManyToOne(() => Resort, (resort) => resort.posts, { nullable: true })
  resort?: Promise<Resort>;

  @OneToMany(() => Report, (report) => report.post)
  filedReports: Promise<Report[]>;
}
