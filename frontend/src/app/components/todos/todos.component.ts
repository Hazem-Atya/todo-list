import { Component, OnInit } from "@angular/core";
import { Todo } from "../../Todo";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor() {
    this.todos = [];
  }

  ngOnInit() {
    this.loadTodosFromLocalStorage();
  }

  loadTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodosToLocalStorage();
      
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodosToLocalStorage();
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodosToLocalStorage();
  }
}
