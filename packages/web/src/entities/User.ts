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
import Post from 'src/entities/Post';
import Badge from 'src/entities/Badge';
import { Role } from '@enums/Roles';
import Comment from 'src/entities/Comment';
import Resort from './Resort';
import Notification from './Notification';
import Report from './Report';
import Connection from './Connection';
import Question from './Question';
import Answer from './Answer';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  avatar?: string;

  @Column({ nullable: true })
  banner?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  discord?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  google?: string;

  @Column({ nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  url?: string;

  @Column()
  verified: boolean;

  @Column('simple-array')
  roles: Role[] = [];

  @OneToMany(() => Post, (post) => post.author)
  posts?: Promise<Post[]>;

  @OneToMany(() => Question, (question) => question.author)
  questions?: Promise<Question[]>;

  @OneToMany(() => Answer, (answer) => answer.author)
  answers?: Promise<Answer[]>;

  @OneToMany(() => Report, (report) => report.reporter)
  reportsMade: Promise<Report[]>;

  @OneToMany(() => Report, (report) => report.user)
  filedReports: Promise<Report[]>;

  @ManyToMany(() => Post, (post) => post.upvoters)
  @JoinTable()
  upvotedPosts: Promise<Post[]>;

  @ManyToMany(() => Post, (post) => post.downvoters)
  @JoinTable()
  downvotedPosts: Promise<Post[]>;

  @ManyToMany(() => Comment, (comment) => comment.upvoters)
  @JoinTable()
  upvotedComments: Promise<Comment[]>;

  @ManyToMany(() => Comment, (comment) => comment.downvoters)
  @JoinTable()
  downvotedComments: Promise<Comment[]>;

  @ManyToMany(() => Question, (question) => question.upvoters)
  @JoinTable()
  upvotedQuestions: Promise<Question[]>;

  @ManyToMany(() => Question, (question) => question.downvoters)
  @JoinTable()
  downvotedQuestions: Promise<Question[]>;

  @ManyToMany(() => Answer, (answer) => answer.upvoters)
  @JoinTable()
  upvotedAnswers: Promise<Answer[]>;

  @ManyToMany(() => Answer, (answer) => answer.downvoters)
  @JoinTable()
  downvotedAnswers: Promise<Answer[]>;

  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications?: Notification[];

  @OneToMany(() => Resort, (resort) => resort.owner)
  ownedResorts?: Promise<Resort[]>;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Promise<Comment[]>;

  @ManyToMany(() => Badge)
  @JoinTable()
  badges: Promise<Badge[]>;

  @Column({ nullable: true })
  isBot?: boolean;

  @ManyToOne(() => User, (user) => user.bots, { nullable: true })
  botOwner?: Promise<User>;

  @OneToMany(() => User, (user) => user.botOwner, { nullable: true })
  bots?: Promise<User[]>;

  @Column({ nullable: true })
  botTokenId?: string;

  @Column({ nullable: true })
  vscTokenCount?: number;

  @ManyToMany(() => Resort, (resort) => resort.members)
  joinedResorts: Promise<Resort[]>;

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: Promise<User[]>;

  @ManyToMany(() => User, (user) => user.following)
  followers: Promise<User[]>;

  @OneToMany(() => Connection, (connection) => connection.user)
  connections: Promise<Connection[]>;

  @Column({ nullable: true })
  banExiration?: string;

  @Column({ nullable: true })
  premiumExiration?: string;
}
