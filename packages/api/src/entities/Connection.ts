import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';
import User from './User';

@Entity()
export default class Connection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.connections)
  user: Promise<User>;

  @Column()
  connectionMethod: String;
}
