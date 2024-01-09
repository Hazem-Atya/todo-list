import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private api = environment.apiUrl+'/todos';
  private todos: Todo[] = [];

  constructor(private http: HttpClient) {
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
