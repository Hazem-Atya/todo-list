import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatusEnum } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { TodosocketService } from 'src/app/websocket/todosocket.service';
import { AddTodoDto } from '../dto/addTodo.dto';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  socket: any;
  totalPending: number = 0;
  totalCompleted: number = 0;

  constructor(
    private todoService: TodoService,
    private todosocketService: TodosocketService
  ) {
    this.socket = this.todosocketService.getSocket();
    this.todos = [];

    this.socket.on('ADD_TODO', (data: any) => {
      this.todos.push(data);
      this.totalPending++;
    });

    this.socket.on('DELETE_TODO', (data: any) => {
      const todoToDeleteIndex = this.todos.findIndex((t) => t.id === data);
      if (this.todos[todoToDeleteIndex].status === TodoStatusEnum.completed) {
        this.totalCompleted--;
      } else {
        this.totalPending--;
      }
      this.todos = this.todos.filter((todo) => todo.id !== data);
    });

    this.socket.on('UPDATE_TODO', (data: any) => {
      const index = this.todos.findIndex((todo) => todo.id === data.id);
      this.todos[index] = data;
    });
  }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe({
      next: (todos: Todo[]) => {
        console.log(todos);
        this.todos = todos;
        this.totalCompleted = todos.filter(
          (t) => t.status === TodoStatusEnum.completed
        ).length;
        this.totalPending = todos.filter(
          (t) => t.status === TodoStatusEnum.pending
        ).length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      if (todo) {
        if (todo.status == TodoStatusEnum.pending) {
          todo.status = TodoStatusEnum.completed;
          this.totalCompleted++;
          this.totalPending--;
        } else {
          todo.status = TodoStatusEnum.pending;
          this.totalCompleted--;
          this.totalPending++;
        }
      }
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteById(id).subscribe({
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTodo(todo: AddTodoDto) {
    this.todoService.addTodo(todo).subscribe({
      error: (err) => {
        console.log(err);
      },
    });
  }
}
