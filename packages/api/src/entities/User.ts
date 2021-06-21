import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from '@entities/Post';
import Badge from '@entities/Badge';
import { Role } from '@enums/Roles';
import Comment from '@entities/Comment';
import Resort from './Resort';
import Notification from './Notification';
import { RelationalPagination } from '@utils/paginate/RelationalPagination';
import Report from './Report';
import Connection from './Connection';
import { SelfOnly } from '@middleware/SelfOnly';
import Question from './Question';
import Answer from './Answer';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id?: string;

  @Column()
  @Field()
  avatar?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  banner?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bio?: string;

  @Column()
  @Field()
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  discord?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  google?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url?: string;

  @Column()
  @Field()
  verified: boolean;

  @Column('simple-array')
  @Field(() => [Role])
  roles: Role[] = [];

  // @Field(() => [Post], { nullable: true, complexity: 5 })
  @RelationalPagination(() => User, () => Post, 'author')
  @OneToMany(() => Post, (post) => post.author)
  posts?: Promise<Post[]>;

  @RelationalPagination(() => Question, () => Answer, 'author')
  @OneToMany(() => Question, (question) => question.author)
  questions?: Promise<Question[]>;

  @RelationalPagination(() => User, () => Answer, 'author')
  @OneToMany(() => Answer, (answer) => answer.author)
  answers?: Promise<Answer[]>;

  @OneToMany(() => Report, (report) => report.reporter)
  reportsMade: Promise<Report[]>;

  @OneToMany(() => Report, (report) => report.user)
  filedReports: Promise<Report[]>;

  @RelationalPagination(() => User, () => Post, 'upvoters')
  @ManyToMany(() => Post, (post) => post.upvoters)
  @JoinTable()
  upvotedPosts: Promise<Post[]>;

  @RelationalPagination(() => User, () => Post, 'downvoters')
  @ManyToMany(() => Post, (post) => post.downvoters)
  @JoinTable()
  downvotedPosts: Promise<Post[]>;

  @RelationalPagination(() => User, () => Comment, 'upvoters')
  @ManyToMany(() => Comment, (comment) => comment.upvoters)
  @JoinTable()
  upvotedComments: Promise<Comment[]>;

  @RelationalPagination(() => User, () => Comment, 'downvoters')
  @ManyToMany(() => Comment, (comment) => comment.downvoters)
  @JoinTable()
  downvotedComments: Promise<Comment[]>;

  @RelationalPagination(() => User, () => Question, 'upvoters')
  @ManyToMany(() => Question, (question) => question.upvoters)
  @JoinTable()
  upvotedQuestions: Promise<Question[]>;

  @RelationalPagination(() => User, () => Question, 'downvoters')
  @ManyToMany(() => Question, (question) => question.downvoters)
  @JoinTable()
  downvotedQuestions: Promise<Question[]>;

  @RelationalPagination(() => User, () => Answer, 'upvoters')
  @ManyToMany(() => Answer, (answer) => answer.upvoters)
  @JoinTable()
  upvotedAnswers: Promise<Answer[]>;

  @RelationalPagination(() => User, () => Answer, 'downvoters')
  @ManyToMany(() => Answer, (answer) => answer.downvoters)
  @JoinTable()
  downvotedAnswers: Promise<Answer[]>;

  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications?: Notification[];

  @Field(() => [Resort], { nullable: true, complexity: 5 })
  @OneToMany(() => Resort, (resort) => resort.owner)
  ownedResorts?: Promise<Resort[]>;

  // @Field(() => [Comment], { nullable: true, complexity: 5 })
  @RelationalPagination(() => User, () => Comment, 'author')
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Promise<Comment[]>;

  @Field(() => [Badge], { nullable: true, complexity: 5 })
  @ManyToMany(() => Badge)
  @JoinTable()
  badges: Promise<Badge[]>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isBot?: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.bots, { nullable: true })
  botOwner?: Promise<User>;

  // @Field(() => [User], { nullable: true })
  @RelationalPagination(() => User, () => User, 'botOwner')
  @OneToMany(() => User, (user) => user.botOwner, { nullable: true })
  bots?: Promise<User[]>;

  @Column({ nullable: true })
  botTokenId?: string;

  @Column({ nullable: true })
  vscTokenCount?: number;

  @ManyToMany(() => Resort, (resort) => resort.members)
  joinedResorts: Promise<Resort[]>;

  @RelationalPagination(() => User, () => User, 'followers')
  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: Promise<User[]>;

  @RelationalPagination(() => User, () => User, 'following')
  @ManyToMany(() => User, (user) => user.following)
  followers: Promise<User[]>;

  @OneToMany(() => Connection, (connection) => connection.user)
  connections: Promise<Connection[]>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @SelfOnly()
  banExiration?: string;
}
