import { TodoStatusEnum } from "../models/todo.model";

export interface UpdateTodoDto {
    title: string;
    description: string;
    status: TodoStatusEnum
}
