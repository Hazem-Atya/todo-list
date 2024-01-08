import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

export enum TodoStatusEnum {
  'todo' = 'To Do',
  'in_progress' = 'In Progress',
  'completed' = 'Completed',
}
@Entity('todo')
export class TodoEntity extends TimeStampEntity {
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
}
