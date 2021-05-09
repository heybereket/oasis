import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Repo from './Repo';
import Post from './Post';
import Badge from './Badge';
import { Role } from '../modules/user/Roles';
import Comment from './Comment';

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
  github: string;

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

  @Field(() => [Repo], { nullable: true })
  @OneToMany(() => Repo, (repo) => repo.owner)
  repos: Promise<Repo[]>;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.author)
  posts: Promise<Post[]>;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Promise<Comment[]>;

  @Field(() => [Badge], { nullable: true })
  @ManyToMany(() => Badge)
  badges: Promise<Badge[]>;
}
