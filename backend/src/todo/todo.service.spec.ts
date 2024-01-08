import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoEntity, TodoStatusEnum } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/addTodo.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateTodoDto } from './dto/updateTodo.dto';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  describe('getAll', () => {
    it('should return an array of todos', async () => {
      const todos: TodoEntity[] = []; // create some test todos
      jest.spyOn(todoRepository, 'find').mockResolvedValue(todos);

      expect(await todoService.getAll()).toBe(todos);
    });
  });

  describe('add', () => {
    it('should add a new todo', async () => {
      const addTodoDto: AddTodoDto = {
        title: 'Test Todo',
        description: 'Test Description',
      };

      const savedTodo: TodoEntity = {
        id: 1,
        ...addTodoDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: TodoStatusEnum.todo,
      };

      jest.spyOn(todoRepository, 'save').mockResolvedValue(savedTodo);

      expect(await todoService.add(addTodoDto)).toBe(savedTodo);
    });
  });

  describe('getByID', () => {
    it('should throw NotFoundException for non-existing todo', async () => {
      jest.spyOn(todoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(todoService.getByID(1)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return the todo for an existing ID', async () => {
      const existingTodo: TodoEntity = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: TodoStatusEnum.todo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(todoRepository, 'findOneBy').mockResolvedValue(existingTodo);

      expect(await todoService.getByID(1)).toBe(existingTodo);
    });
  });
  describe('deleteById', () => {
    it('should throw NotFoundException for non-existing todo', async () => {
      jest.spyOn(todoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(todoService.deleteById(1)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should delete the todo for an existing ID', async () => {
      const existingTodo: TodoEntity = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: TodoStatusEnum.todo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(todoRepository, 'findOneBy').mockResolvedValue(existingTodo);
      jest
        .spyOn(todoRepository, 'delete')
        .mockResolvedValue({ raw: [], affected: 1 });

      expect(await todoService.deleteById(1)).toEqual({ raw: [], affected: 1 });
    });
  });

  describe('update', () => {
    it('should throw NotFoundException for non-existing todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Title',
        status: TodoStatusEnum.completed,
      };
      jest.spyOn(todoRepository, 'preload').mockResolvedValue(null);

      await expect(todoService.update(updateTodoDto, 1)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should update the todo for an existing ID', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Title',
        status: TodoStatusEnum.completed,
      };
      const existingTodo: TodoEntity = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: TodoStatusEnum.todo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTodo: TodoEntity = {
        ...existingTodo,
        ...updateTodoDto,
      };

      jest.spyOn(todoRepository, 'preload').mockResolvedValue(existingTodo);
      jest.spyOn(todoRepository, 'save').mockResolvedValue(updatedTodo);

      expect(await todoService.update(updateTodoDto, 1)).toEqual(updatedTodo);
    });
  });
});
