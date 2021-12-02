import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDateTime } from '../../common/entities/base-date.entity';
import { Customer } from './customer.entity';
import { Exclude, classToPlain } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column(() => BaseDateTime, { prefix: false })
  timestamp: BaseDateTime;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  toJSON() {
    return classToPlain(this);
  }
}
