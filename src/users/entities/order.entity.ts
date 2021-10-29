import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { BaseDate } from '../../common/entities/base-date.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: false })
  customer: Customer;

  @OneToMany(() => OrderItem, (items) => items.order)
  items: OrderItem[];
}
