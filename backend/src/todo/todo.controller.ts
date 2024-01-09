import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoEntity } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodoController {
  constructor(private todoService: TodoService) { }

  @ApiResponse({ status: 200, description: 'Get All todos', type: TodoEntity, isArray: true })
  @Get()
  getAllTodos() {
    return this.todoService.getAll();
  }

  @ApiResponse({ status: 200, description: 'Return one todo by ID', type: TodoEntity })
  @ApiResponse({ status: 404, description: 'Todo Not Found' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', type: 'number' })
  @Get(':id')
  getTodoByID(@Param('id', ParseIntPipe) id) {
    return this.todoService.getByID(id);
  }

  @ApiResponse({ status: 201, description: 'Todo is created successfully', type: TodoEntity })
  @HttpCode(201)
  @Post()
  addTodo(@Body() addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.add(addTodoDto);
  }

  @ApiResponse({ status: 200, description: 'Todo is updated successfully', type: TodoEntity })
  @ApiResponse({ status: 404, description: 'Todo Not Found' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', type: 'number' })
  @Patch(':id')
  updateTodo(
    @Body() addTodo: UpdateTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoEntity> {
    return this.todoService.update(addTodo, id);
  }

  @ApiResponse({ status: 204, description: 'Todo is deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo Not Found' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', type: 'number' })
  @HttpCode(204)
  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id) {
    return this.todoService.deleteById(id);
  }
}
