import { Component, Output, EventEmitter } from '@angular/core';
import { Todo, TodoStatusEnum } from '../models/todo.model';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  title: string = '';
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  onSubmit() {
    // alert(this.title);
    const todo = {
      id: Math.floor(Math.random() * 1001) + 1,
      title: this.title,
      description: this.title,
      status: TodoStatusEnum.pending,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.todoAdd.emit(todo);
    this.title = '';
  }
}
