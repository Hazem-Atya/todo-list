import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatusEnum {
  'pending' = 'Pending',
  'completed' = 'Completed',
}
@Entity('todo')
export class TodoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    length: 50,
  })

  @ApiProperty()
  title: string;

  @ApiProperty()
  @Column()
  description: string;
  
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.pending,
  })
  status: TodoStatusEnum;
  
  @ApiProperty()
  @CreateDateColumn({
    type: Date,
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: Date,
    name: 'updated_at',
  })
  updatedAt: Date;
}
