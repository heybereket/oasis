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
import Repo from '@entities/Repo';
import Post from '@entities/Post';
import Badge from '@entities/Badge';
import { Role } from '@modules/user/Roles';
import Comment from '@entities/Comment';
import Resort from './Resort';
import Notification from './Notification';
import { RelationalPagination } from '@utils/RelationalPagination';
import Report from './Report';
import Connection from './Connection';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  avatar: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  banner: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bio: string;

  @Column()
  @Field()
  createdAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  discord: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  github: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  google: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url: string;

  @Column()
  @Field()
  verified: boolean;

  @Column('simple-array')
  @Field(() => [Role])
  roles: Role[] = [];

  @Field(() => [Repo], { nullable: true, complexity: 5 })
  @OneToMany(() => Repo, (repo) => repo.owner)
  repos: Promise<Repo[]>;

  // @Field(() => [Post], { nullable: true, complexity: 5 })
  @RelationalPagination(() => User, () => Post, 'author')
  @OneToMany(() => Post, (post) => post.author)
  posts: Promise<Post[]>;

  @OneToMany(() => Report, (report) => report.reportee)
  reports: Promise<Report[]>;

  @OneToMany(() => Report, (report) => report.reporter)
  filedReports: Promise<Report[]>;

  @RelationalPagination(() => User, () => Post, 'likers')
  @ManyToMany(() => Post, (post) => post.likers)
  @JoinTable()
  likedPosts: Promise<Post[]>;

  @RelationalPagination(() => User, () => Post, 'dislikers')
  @ManyToMany(() => Post, (post) => post.dislikers)
  @JoinTable()
  dislikedPosts: Promise<Post[]>;

  @RelationalPagination(() => User, () => Comment, 'likers')
  @ManyToMany(() => Comment, (comment) => comment.likers)
  @JoinTable()
  likedComments: Promise<Comment[]>;

  @RelationalPagination(() => User, () => Comment, 'dislikers')
  @ManyToMany(() => Comment, (comment) => comment.dislikers)
  @JoinTable()
  dislikedComments: Promise<Comment[]>;

  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications: Notification[];

  @Field(() => [Resort], { nullable: true, complexity: 5 })
  @OneToMany(() => Resort, (resort) => resort.owner)
  ownedResorts: Promise<Resort[]>;

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
  isBot: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.bots, { nullable: true })
  botOwner: Promise<User>;

  // @Field(() => [User], { nullable: true })
  @RelationalPagination(() => User, () => User, 'botOwner')
  @OneToMany(() => User, (user) => user.botOwner, { nullable: true })
  bots: Promise<User[]>;

  @Column({ nullable: true })
  botTokenId: string;

  @Column({ nullable: true })
  vscTokenCount: number;

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
}
