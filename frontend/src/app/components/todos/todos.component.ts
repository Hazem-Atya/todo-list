import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatusEnum } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe({
      next: (todos: Todo[]) => {
        console.log(todos);
        this.todos = todos;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      if (todo.status == TodoStatusEnum.pending)
        todo.status = TodoStatusEnum.completed;
      else todo.status = TodoStatusEnum.pending;
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteById(id).subscribe({
      next: (todo) => {
        console.log(todo);
        this.todos = this.todos.filter((t) => t.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todoService.addTodo(todo).subscribe({
      next: (todo) => {
        console.log(todo);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
