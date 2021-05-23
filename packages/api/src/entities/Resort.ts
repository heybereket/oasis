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
import { RelationalPagination } from '@utils/RelationalPagination';
import { BCEntity, BCField, PublicField } from '@root/bot-client-gen';

@ObjectType()
@Entity()
@BCEntity('resorts')
export default class Resort extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PublicField()
  id: string;

  @Column()
  @PublicField()
  name: string;

  @Column()
  @PublicField()
  description: string;

  @Column()
  @PublicField()
  banner: string;

  @Column()
  @PublicField()
  logo: string;

  @Column()
  @PublicField()
  category: string;

  @Column()
  @PublicField()
  createdAt: string;

  // @Field(() => [Post], { complexity: 5 })
  @RelationalPagination(() => Resort, () => Post, 'resort')
  @OneToMany(() => Post, (post) => post.resort)
  @BCField({ type: 'PaginationResponseType<Post>' })
  posts: Promise<Post[]>;

  @ManyToOne(() => User, (user) => user.ownedResorts)
  @Field(() => User)
  @BCField({ type: 'User' })
  owner: Promise<User>;

  @ManyToMany(() => User, (user) => user.joinedResorts)
  @JoinTable()
  @RelationalPagination(() => Resort, () => User, 'joinedResorts')
  @BCField({ type: 'PaginationResponseType<User>' })
  members: Promise<User[]>;
}
