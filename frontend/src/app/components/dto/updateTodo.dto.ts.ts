import { TodoStatusEnum } from "../models/todo.model";
import { AddTodoDto } from "./addTodo.dto";

export interface UpdateTodoDto extends Partial<AddTodoDto> {
    status: TodoStatusEnum
}
