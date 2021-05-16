import { Field, ObjectType } from 'type-graphql';
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
import User from './User';

@ObjectType()
@Entity()
export default class Resort extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  banner: string;

  @Column()
  @Field()
  logo: string;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field()
  createdAt: string;

  @OneToMany(() => Post, (post) => post.resort)
  @Field(() => [Post], { complexity: 5 })
  posts: Promise<Post[]>;

  @ManyToOne(() => User, (user) => user.ownedResorts)
  @Field(() => User)
  owner: Promise<User>;

  @ManyToMany(() => User, (user) => user.joinedResorts)
  @JoinTable()
  members: Promise<User[]>;
}
