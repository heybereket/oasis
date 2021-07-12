import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import User from 'src/entities/User';
import Comment from 'src/entities/Comment';
import Resort from 'src/entities/Resort';
import Report from './Report';
import Answer from './Answer';

@Entity()
export default class Question extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  lastEdited?: string;

  @Column('simple-array')
  topics: string[];

  @ManyToOne(() => User, (user) => user.posts)
  author: Promise<User>;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Promise<Answer[]>;

  @ManyToMany(() => User, (user) => user.upvotedQuestions)
  upvoters: Promise<User[]>;

  @ManyToMany(() => User, (user) => user.downvotedQuestions)
  downvoters: Promise<User[]>;

  @OneToMany(() => Comment, (comment) => comment.question)
  comments: Promise<Comment[]>;

  @ManyToOne(() => Resort, (resort) => resort.posts, { nullable: true })
  resort?: Promise<Resort>;

  @OneToMany(() => Report, (report) => report.question)
  filedReports: Promise<Report[]>;
}
