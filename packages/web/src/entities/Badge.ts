import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Badge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  imagePath: string;

  @Column()
  level: number;

  @Column()
  description: string;

  @Column()
  createdAt: string;
}
