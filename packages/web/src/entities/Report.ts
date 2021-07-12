import 'reflect-metadata';
import { ReportType } from '@enums/Reports';
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

@Entity()
export default class Report extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resolved: boolean;

  @Column()
  type: ReportType;

  // Person that filed report
  @ManyToOne(() => User, (user: User) => user.reportsMade)
  reporter: Promise<User>;

  @ManyToOne(() => User, (user) => user.filedReports)
  user?: Promise<User>;

  @ManyToOne(() => Post, (post) => post.filedReports)
  post?: Promise<Post>;

  @ManyToOne(() => Question, (question) => question.filedReports)
  question?: Promise<Question>;

  @ManyToOne(() => Answer, (answer) => answer.filedReports)
  answer?: Promise<Answer>;

  @ManyToOne(() => Comment, (comment) => comment.filedReports)
  comment?: Promise<Comment>;

  @ManyToOne(() => Resort, (resort) => resort.filedReports)
  resort?: Promise<Resort>;

  @Column({ nullable: true })
  information?: string;

  @Column()
  createdAt: string;
}
