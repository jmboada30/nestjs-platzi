import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseDateTime {
  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
