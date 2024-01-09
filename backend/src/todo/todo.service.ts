import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoGateway } from './gateways/todo.gateway';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly todoGateway: TodoGateway,
  ) { }

  getAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  async add(addTodo: AddTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.save(addTodo);
    this.todoGateway.sendAddedTodo(todo);
    return todo;
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
      this.todoGateway.sendUpdatedTodo(newTodo);
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
    this.todoGateway.sendDeletedTodo(id);
    return this.todoRepository.delete(id);
  }

}
