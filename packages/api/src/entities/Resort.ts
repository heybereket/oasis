import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './Post';

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

  @OneToMany(() => Post, (post) => post.resort)
  @Field(() => [Post], { complexity: 5 })
  posts: Promise<Post[]>;
}
