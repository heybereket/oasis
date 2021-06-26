import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import User from '@entities/User';
import { RelationalPagination } from '@utils/paginate/RelationalPagination';
import Report from './Report';
import Question from './Question';

@ObjectType()
@Entity()
export default class Answer extends BaseEntity {
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

  @Field(() => Question, { complexity: 1 })
  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Promise<Question>;

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.answers)
  author: Promise<User>;

  @RelationalPagination(() => Answer, () => User, 'upvotedAnswers')
  @ManyToMany(() => User, (user) => user.upvotedAnswers)
  upvoters: Promise<User[]>;

  @RelationalPagination(() => Answer, () => User, 'downvotedAnswers')
  @ManyToMany(() => User, (user) => user.downvotedAnswers)
  downvoters: Promise<User[]>;

  @OneToMany(() => Report, (report) => report.answer)
  filedReports: Promise<Report[]>;

  @Column({ nullable: true })
  upvotes?: number = 0;

  @Field({ nullable: false, name: 'upvotes' })
  getUpvotes(@Root() root: any): number {
    return root.upvotes ?? 0;
  }

  @Column({ nullable: true })
  downvotes?: number = 0;

  @Field({ nullable: false, name: 'downvotes' })
  getDownvotes(@Root() root: any): number {
    return root.downvotes ?? 0;
  }
}
