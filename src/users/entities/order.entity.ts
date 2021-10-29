import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { BaseDateTime } from '../../common/entities/base-date.entity';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column(() => BaseDateTime, { prefix: false })
  timestamp: BaseDateTime;

  @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // Para usar Exclude o Expose de class-transformer se debe configurar main.ts
  // Podemos modificar la respuesta q enviaremos al frontend en esta etapa.
  @Exclude()
  @OneToMany(() => OrderItem, (items) => items.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (!this.items?.length) return [];

    return this.items
      .filter((item) => !!item)
      .map((item) => ({
        ...item.product,
        quantity: item.quantity,
        itemId: item.id,
      }));
  }

  @Expose()
  get priceTotal() {
    if (!this.items?.length) return 0;
    return this.items
      .filter((item) => !!item)
      .reduce((total, acu) => {
        const totalItem = acu.product.price * acu.quantity;
        return total + totalItem;
      }, 0);
  }
}
