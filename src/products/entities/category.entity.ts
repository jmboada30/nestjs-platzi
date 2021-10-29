import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseDateTime } from '../../common/entities/base-date.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column(() => BaseDateTime, { prefix: false })
  timestamp: BaseDateTime;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
