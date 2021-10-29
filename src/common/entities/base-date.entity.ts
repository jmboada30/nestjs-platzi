import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';

export class BaseDate {
  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createAt: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updateAt: Date;

  toJSON() {
    return classToPlain(this);
  }
}
