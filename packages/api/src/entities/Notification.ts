import { NotificationType } from '@typings/Notifications';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@ObjectType()
@Entity()
export default class Notification extends BaseEntity {
  @Field()
  @Column({ type: 'date' })
  createdAt: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => NotificationType)
  @Column()
  type: NotificationType;

  @Field(() => User)
  @ManyToOne(() => User)
  user: Promise<User>;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  performer?: Promise<User>;

  @Field()
  @Column()
  read: boolean;
}
