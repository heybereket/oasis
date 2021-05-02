import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@ObjectType()
@Entity()
export default class Repo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  active: boolean;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  full_name: string;

  @Column()
  @Field()
  github_owner: string;

  @Column()
  @Field()
  issues: number;

  @Column()
  @Field()
  desc: string;

  @Column()
  @Field()
  language: string;
  @Column()
  @Field()
  stars: number;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field(() => String, {
    description:
      "Time when the repo was added (the number of milliseconds passed since Unix epoch 1970-01-01T00:00:00Z)",
  })
  date_added: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  owner: User;
}
