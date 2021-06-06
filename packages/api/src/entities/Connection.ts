import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './User';
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
