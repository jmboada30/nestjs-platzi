import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDate } from '../../common/entities/base-date.entity';
import { Customer } from './customer.entity';

@Entity()
export class User extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
