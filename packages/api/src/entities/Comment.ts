import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  AfterInsert,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import Post from '@entities/Post';
import User from '@entities/User';
import { RelationalPagination } from '@utils/paginate/RelationalPagination';
import { createNotification } from '@utils/index';
import { NotificationType } from '@enums/Notifications';
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

  @AfterInsert()
  async notification() {
    createNotification({
      userId: (await (await this.post).author).id,
      performerId: (await this.author).id,
      type: NotificationType.Comment,
    });
  }
}
