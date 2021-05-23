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
import { BCEntity, BCField, PublicField } from '@root/bot-client-gen';

@ObjectType()
@Entity()
@BCEntity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @BCField()
  id: string;

  @Column()
  @PublicField()
  avatar: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  banner: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  username: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  bio: string;

  @Column()
  @PublicField()
  createdAt: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  discord: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  github: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  google: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  @PublicField({ nullable: true })
  url: string;

  @Column()
  @PublicField()
  verified: boolean;

  @Column('simple-array')
  @Field(() => [Role])
  @BCField({ type: 'Role[]' })
  roles: Role[] = [];

  @Field(() => [Repo], { nullable: true, complexity: 5 })
  @OneToMany(() => Repo, (repo) => repo.owner)
  @BCField({ type: 'Repo[]' })
  repos: Promise<Repo[]>;

  // @Field(() => [Post], { nullable: true, complexity: 5 })
  @RelationalPagination(() => User, () => Post, 'author')
  @OneToMany(() => Post, (post) => post.author)
  @BCField({ type: 'PaginationResponseType<Post>' })
  posts: Promise<Post[]>;

  @RelationalPagination(() => User, () => Post, 'likers')
  @ManyToMany(() => Post, (post) => post.likers)
  @JoinTable()
  @BCField({ type: 'PaginationResponseType<Post>' })
  likedPosts: Promise<Post[]>;

  @RelationalPagination(() => User, () => Post, 'dislikers')
  @ManyToMany(() => Post, (post) => post.dislikers)
  @JoinTable()
  @BCField({ type: 'PaginationResponseType<Post>' })
  dislikedPosts: Promise<Post[]>;

  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications: Notification[];

  @Field(() => [Resort], { nullable: true, complexity: 5 })
  @OneToMany(() => Resort, (resort) => resort.owner)
  @BCField({ type: 'Resort[]' })
  ownedResorts: Promise<Resort[]>;

  //@Field(() => [Comment], { nullable: true, complexity: 5 })
  @RelationalPagination(() => User, () => Comment, 'author')
  @OneToMany(() => Comment, (comment) => comment.author)
  @BCField({ type: 'PaginationResponseType<Comment>' })
  comments: Promise<Comment[]>;

  @Field(() => [Badge], { nullable: true, complexity: 5 })
  @ManyToMany(() => Badge)
  @JoinTable()
  @BCField({ type: 'Badge[]' })
  badges: Promise<Badge[]>;

  @PublicField({ nullable: true })
  @Column({ nullable: true })
  isBot: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.bots, { nullable: true })
  @BCField({ type: 'User', nullable: true })
  botOwner: Promise<User>;

  // @Field(() => [User], { nullable: true })
  @RelationalPagination(() => User, () => User, 'botOwner')
  @OneToMany(() => User, (user) => user.botOwner, { nullable: true })
  @BCField({ type: 'PaginationResponseType<User>' })
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
  @BCField({ type: 'PaginationResponseType<User>' })
  following: Promise<User[]>;

  @RelationalPagination(() => User, () => User, 'following')
  @ManyToMany(() => User, (user) => user.following)
  @BCField({ type: 'PaginationResponseType<User>' })
  followers: Promise<User[]>;
}
