import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "../../Todo";
@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() todoCheckbox: EventEmitter<number> = new EventEmitter();
  @Output() todoDelete: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onComplete(id: number = 0): void {
    this.todoCheckbox.emit(id);
  }
  onDelete(id:number=0):void{
    this.todoDelete.emit(id)
  }
}
