import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import User from 'src/entities/User';
import Comment from 'src/entities/Comment';
import Resort from 'src/entities/Resort';
import Report from './Report';

@Entity()
export default class Post extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  lastEdited?: string;

  @Column('simple-array')
  topics: string[];

  @ManyToOne(() => User, (user) => user.posts)
  author: Promise<User>;

  @ManyToMany(() => User, (user) => user.upvotedPosts)
  upvoters: Promise<User[]>;

  @ManyToMany(() => User, (user) => user.downvotedPosts)
  downvoters: Promise<User[]>;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Promise<Comment[]>;

  @ManyToOne(() => Resort, (resort) => resort.posts, { nullable: true })
  resort?: Promise<Resort>;

  @OneToMany(() => Report, (report) => report.post)
  filedReports: Promise<Report[]>;

  @Column({ nullable: true })
  imageName?: string;

  imageNameResolver(post: Post): string | undefined {
    return post.imageName !== null
      ? process.env.STORE_IMAGES_ON_S3 === 'true'
        ? `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_ENDPOINT}/${post.imageName}`
        : `/images/${this.imageName}`
      : undefined;
  }

  @Column()
  upvotes: number = 0;

  @Column()
  downvotes: number = 0;
}
