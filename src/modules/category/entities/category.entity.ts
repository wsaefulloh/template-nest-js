// import { Product } from 'src/modules/product/entities/product.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: `bigint`,
  })
  id: number;

  @Column({
    name: 'name_category',
    type: `varchar`,
    length: 251,
  })
  name_category: string;

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

  //   @OneToMany((type) => Product, (user) => user.role, {
  //     onDelete: 'CASCADE',
  //   })
  //   users: User[];
}
