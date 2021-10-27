import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDate } from '../../common/entities/base-date.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
