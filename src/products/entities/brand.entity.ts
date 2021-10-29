import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { BaseDateTime } from '../../common/entities/base-date.entity';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column(() => BaseDateTime, { prefix: false })
  timestamp: BaseDateTime;

  @OneToMany(() => Product, (products) => products.brand)
  products: Product[];
}
