import 'reflect-metadata';
import { ReportType } from '@enums/Reports';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Post from './Post';
import Comment from './Comment';
import Resort from './Resort';
import Question from './Question';
import Answer from './Answer';

@ObjectType()
@Entity()
export default class Report extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  resolved: boolean;

  @Column()
  @Field(() => ReportType)
  type: ReportType;

  // Person that filed report
  @ManyToOne(() => User, (user: User) => user.reportsMade)
  @Field(() => User)
  reporter: Promise<User>;

  @ManyToOne(() => User, (user) => user.filedReports)
  @Field(() => User, { nullable: true })
  user?: Promise<User>;

  @ManyToOne(() => Post, (post) => post.filedReports)
  @Field(() => Post, { nullable: true })
  post?: Promise<Post>;

  @ManyToOne(() => Question, (question) => question.filedReports)
  @Field(() => Question, { nullable: true })
  question?: Promise<Question>;

  @ManyToOne(() => Answer, (answer) => answer.filedReports)
  @Field(() => Answer, { nullable: true })
  answer?: Promise<Answer>;

  @ManyToOne(() => Comment, (comment) => comment.filedReports)
  @Field(() => Comment, { nullable: true })
  comment?: Promise<Comment>;

  @ManyToOne(() => Resort, (resort) => resort.filedReports)
  @Field(() => Resort, { nullable: true })
  resort?: Promise<Resort>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  information?: string;

  @Column()
  @Field()
  createdAt: string;
}
