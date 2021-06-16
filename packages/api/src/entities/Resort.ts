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
import { RelationalPagination } from '@utils/paginate/RelationalPagination';
import Report from './Report';

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

  // @Field(() => [Post], { complexity: 5 })
  @RelationalPagination(() => Resort, () => Post, 'resort')
  @OneToMany(() => Post, (post) => post.resort)
  posts: Promise<Post[]>;

  @ManyToOne(() => User, (user) => user.ownedResorts)
  @Field(() => User)
  owner: Promise<User>;

  @ManyToMany(() => User, (user) => user.joinedResorts)
  @JoinTable()
  @RelationalPagination(() => Resort, () => User, 'joinedResorts')
  members: Promise<User[]>;

  @OneToMany(() => Report, (report) => report.resort)
  filedReports: Promise<Report[]>;
}
