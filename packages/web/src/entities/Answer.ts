import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import User from 'src/entities/User';
import Report from './Report';
import Question from './Question';

@Entity()
export default class Answer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  lastEdited?: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Promise<Question>;

  @ManyToOne(() => User, (user) => user.answers)
  author: Promise<User>;

  @ManyToMany(() => User, (user) => user.upvotedAnswers)
  upvoters: Promise<User[]>;

  @ManyToMany(() => User, (user) => user.downvotedAnswers)
  downvoters: Promise<User[]>;

  @OneToMany(() => Report, (report) => report.answer)
  filedReports: Promise<Report[]>;

  @Column()
  upvotes: number = 0;

  @Column()
  downvotes: number = 0;
}
