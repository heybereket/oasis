import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from 'src/entities/Post';
import User from './User';
import Report from './Report';

@Entity()
export default class Resort extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  banner: string;

  @Column()
  logo: string;

  @Column()
  category: string;

  @Column()
  createdAt: string;

  @OneToMany(() => Post, (post) => post.resort)
  posts: Promise<Post[]>;

  @ManyToOne(() => User, (user) => user.ownedResorts)
  owner: Promise<User>;

  @ManyToMany(() => User, (user) => user.joinedResorts)
  @JoinTable()
  members: Promise<User[]>;

  @OneToMany(() => Report, (report) => report.resort)
  filedReports: Promise<Report[]>;
}
