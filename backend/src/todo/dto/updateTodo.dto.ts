import { AddTodoDto } from './addTodo.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../entities/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  @ApiProperty()
  status: TodoStatusEnum;
}
