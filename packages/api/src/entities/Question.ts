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
import Answer from './Answer';

@ObjectType()
@Entity()
export default class Question extends BaseEntity {
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

  @RelationalPagination(() => Question, () => Answer, 'question')
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Promise<Answer[]>;

  // @Field(() => User, { complexity: 1 })
  @RelationalPagination(() => Question, () => User, 'upvotedQuestions')
  @ManyToMany(() => User, (user) => user.upvotedQuestions)
  upvoters: Promise<User[]>;

  @RelationalPagination(() => Question, () => User, 'downvotedQuestions')
  @ManyToMany(() => User, (user) => user.downvotedQuestions)
  downvoters: Promise<User[]>;

  @RelationalPagination(() => Question, () => Comment, 'question')
  @OneToMany(() => Comment, (comment) => comment.question)
  comments: Promise<Comment[]>;

  @Field(() => Resort, { nullable: true, complexity: 1 })
  @ManyToOne(() => Resort, (resort) => resort.posts, { nullable: true })
  resort?: Promise<Resort>;

  @OneToMany(() => Report, (report) => report.question)
  filedReports: Promise<Report[]>;
}
