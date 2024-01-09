import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });
  describe('getAll', () => {
    it('Should be defined', async () => {
      expect(controller).toBeDefined();

      it('should return an array of todos', async () => {
        const data = await controller.getAllTodos();
        expect(await controller.getAllTodos()).toEqual([]);
      });
    });
  });
});
