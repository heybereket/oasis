import { NotificationType } from '@enums/Notifications';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity()
export default class Notification extends BaseEntity {
  @Column()
  createdAt: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: NotificationType;

  @ManyToOne(() => User, (user) => user.notifications)
  user: Promise<User>;

  @ManyToOne(() => User)
  performer: Promise<User>;

  @Column()
  read: boolean;
}
