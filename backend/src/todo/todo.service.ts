import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  getAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  add(addTodo: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(addTodo);
  }
  async getByID(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} Not Found`);
    }
    return todo;
  }
  async update(updateTodo: UpdateTodoDto, id: number): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({
      id,
      ...updateTodo,
    });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    }
    throw new NotFoundException(`Todo with ID ${id} Not Found`);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    const foundTodo = await this.todoRepository.findOneBy({
      id: id,
    });

    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID ${id} Not Found`);
    }

    return this.todoRepository.delete(id);
  }
}
