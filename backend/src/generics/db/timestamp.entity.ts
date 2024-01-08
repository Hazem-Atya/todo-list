import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimeStampEntity {
  @CreateDateColumn({
    type: Date,
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: Date,
    name: 'updated_at',
  })
  updatedAt: Date;
}
