import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Post from '@entities/Post';
import User from '@entities/User';
import { RelationalPagination } from '@utils/paginate/RelationalPagination';
import Report from './Report';
import Question from './Question';

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
  lastEdited?: string;

  @Field(() => Post, { complexity: 1, nullable: true })
  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  post: Promise<Post>;

  @Field(() => Question, { complexity: 1, nullable: true })
  @ManyToOne(() => Question, (question) => question.comments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  question?: Promise<Question>;

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.comments)
  author: Promise<User>;

  @RelationalPagination(() => Comment, () => User, 'upvotedComments')
  @ManyToMany(() => User, (user) => user.upvotedComments)
  upvoters: Promise<User[]>;

  @RelationalPagination(() => Comment, () => User, 'downvotedComments')
  @ManyToMany(() => User, (user) => user.downvotedComments)
  downvoters: Promise<User[]>;

  @OneToMany(() => Report, (report) => report.comment)
  filedReports: Promise<Report[]>;

  @Field()
  @Column()
  upvotes: number = 0;

  @Field()
  @Column()
  downvotes: number = 0;
}
