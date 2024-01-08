import { Component, Output, EventEmitter } from "@angular/core";
import { Todo } from "src/app/Todo";
@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"],
})
export class AddTodoComponent {
  title: string = "";
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  onSubmit() {
    // alert(this.title);
    const todo = {
      id: Math.floor(Math.random() * 1001) + 1,
      title: this.title,
      complete: false,
    };
    this.todoAdd.emit(todo);
    this.title = "";
  }
}
