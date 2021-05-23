import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '@entities/User';
import { BCEntity, BCField, PublicField } from '@root/bot-client-gen';

@ObjectType()
@Entity()
@BCEntity('repos')
export default class Repo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @BCField()
  id: string;

  @Column()
  @PublicField()
  active: boolean;

  @Column()
  @PublicField()
  name: string;

  @Column()
  @PublicField()
  full_name: string;

  @Column()
  @PublicField()
  github_owner: string;

  @Column()
  @PublicField()
  issues: number;

  @Column()
  @PublicField()
  desc: string;

  @Column()
  @PublicField()
  language: string;

  @Column()
  @PublicField()
  stars: number;

  @Column()
  @PublicField()
  url: string;

  @Column()
  @Field(() => String, {
    description:
      'Time when the repo was added (the number of milliseconds passed since Unix epoch 1970-01-01T00:00:00Z)',
  })
  @BCField()
  date_added: string;

  @Field(() => User, { complexity: 1 })
  @ManyToOne(() => User, (user) => user.posts)
  @BCField({ type: 'User' })
  owner: Promise<User>;
}
