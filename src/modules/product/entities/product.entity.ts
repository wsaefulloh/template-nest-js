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
import { Category } from 'src/modules/category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: `bigint`,
  })
  id: number;

  @Column({
    name: 'name_product',
    type: `varchar`,
    length: 251,
  })
  name_product: string;

  @Column({
    name: 'price_product',
    type: `varchar`,
    length: 251,
  })
  price_product: string;

  @Column({
    name: 'brand_product',
    type: `varchar`,
    length: 251,
  })
  brand_product: string;

  @Column({
    name: 'image_product',
    type: `varchar`,
    length: 251,
  })
  image_product: string;

  @Column({
    name: 'id_category',
    type: `int`,
  })
  id_category: number;

  @Column({
    name: 'description',
    type: `varchar`,
    length: 251,
  })
  description: string;

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

  @ManyToOne((type) => Category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_category', referencedColumnName: 'id' })
  category: Category;
}
