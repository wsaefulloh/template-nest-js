/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Product } from 'src/modules/product/entities/product.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: `bigint`,
  })
  id: number;

  @Column({
    name: 'username',
    type: `varchar`,
    length: 251,
  })
  username: string;

  @Column({
    name: 'name',
    type: `varchar`,
    length: 251,
  })
  name: string;

  @Column({
    name: 'password',
    type: `varchar`,
    length: 251,
  })
  password: string;

  @Column({
    name: 'createdAt',
    type: `timestamp`,
  })
  createdAt: string;

  @Column({
    name: 'updatedAt',
    type: `timestamp`,
  })
  updatedAt: string;
}
