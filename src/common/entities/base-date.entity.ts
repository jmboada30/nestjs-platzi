import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseDate {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
