import { Component, Output, EventEmitter } from '@angular/core';
import { Todo, TodoStatusEnum } from '../models/todo.model';
import { AddTodoDto } from '../dto/addTodo.dto';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  title: string = '';
  description: string = '';
  @Output() todoAdd: EventEmitter<AddTodoDto> = new EventEmitter();
  onSubmit() {
    const todo = {
      title: this.title,
      description: this.description,
    };
    this.todoAdd.emit(todo);
    this.title = '';
    this.description = '';
  }
}
