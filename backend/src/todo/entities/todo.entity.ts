import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatusEnum {
  'todo' = 'To Do',
  'in_progress' = 'In Progress',
  'completed' = 'Completed',
}
@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  title: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.todo,
  })
  status: TodoStatusEnum;
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
