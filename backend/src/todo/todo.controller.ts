import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoEntity } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAll();
  }
  @Get(':id')
  getTodoByID(@Param('id', ParseIntPipe) id) {
    return this.todoService.getByID(id);
  }

  @Post()
  addTodo(@Body() addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.add(addTodoDto);
  }
  @Patch(':id')
  updateTodo(
    @Body() addTodo: UpdateTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoEntity> {
    return this.todoService.update(addTodo, id);
  }
  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id) {
    return this.todoService.deleteById(id);
  }
}
