import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseDate } from '../../common/entities/base-date.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
@Index(['price', 'image']) // <-- indices en conjunto
export class Product extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Index() // <-- indice a un solo campo
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products) //<-- la relacion va en la entidad debil.
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
