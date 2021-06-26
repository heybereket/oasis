import { NotificationType } from '@enums/Notifications';
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
  @Column()
  createdAt: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => NotificationType)
  @Column()
  type: NotificationType;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  user: Promise<User>;

  @Field(() => User)
  @ManyToOne(() => User)
  performer: Promise<User>;

  @Field()
  @Column()
  read: boolean;
}
