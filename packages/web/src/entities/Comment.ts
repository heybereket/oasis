import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import Post from 'src/entities/Post';
import User from 'src/entities/User';
import Report from './Report';
import Question from './Question';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  lastEdited?: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  post: Promise<Post>;

  @ManyToOne(() => Question, (question) => question.comments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  question?: Promise<Question>;

  @ManyToOne(() => User, (user) => user.comments)
  author: Promise<User>;

  @ManyToMany(() => User, (user) => user.upvotedComments)
  upvoters: Promise<User[]>;

  @ManyToMany(() => User, (user) => user.downvotedComments)
  downvoters: Promise<User[]>;

  @OneToMany(() => Report, (report) => report.comment)
  filedReports: Promise<Report[]>;

  @Column()
  upvotes: number = 0;

  @Column()
  downvotes: number = 0;
}
