import { NotificationType } from '@modules/notification/Notifications';
import { BCEntity, BCField, PublicField } from '@root/bot-client-gen';
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
@BCEntity('notifications')
export default class Notification extends BaseEntity {
  @PublicField()
  @Column({ type: 'date' })
  createdAt: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @BCField()
  id: string;

  @Field(() => NotificationType)
  @Column()
  @BCField({ type: 'NotificationType' })
  type: NotificationType;

  @Field(() => User)
  @ManyToOne(() => User)
  @BCField({ type: 'User' })
  user: Promise<User>;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @BCField({ type: 'User' })
  performer: Promise<User>;

  @PublicField()
  @Column()
  read: boolean = false;
}
