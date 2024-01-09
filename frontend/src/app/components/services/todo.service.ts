import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private api = 'http://localhost:3000/todos';
  private todos: Todo[] = [];

  constructor(private http: HttpClient) {
    console.log("Yeeeeeeeeeey! I'm created");
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + `/${id}`);
  }
  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.api, todo);
  }
}
