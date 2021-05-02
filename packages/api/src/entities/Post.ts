import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import User from "./User";
import Comment from "./Comment";

@ObjectType()
@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  message: string;

  @Column()
  @Field(() => Int)
  likes: number;

  @Column()
  @Field(() => Int)
  dislikes: number;

  @Column("simple-array")
  @Field(() => [String])
  topics: string[];

  @Field(() => User)
  @OneToOne(() => User)
  author: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
