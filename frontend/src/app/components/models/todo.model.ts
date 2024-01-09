export enum TodoStatusEnum {
  'pending' = 'Pending',
  'completed' = 'Completed',
}

export class Todo {
  id?: number;
  title: string;
  description: string;
  status: TodoStatusEnum = TodoStatusEnum.pending;
  created_at: Date = new Date();
  updated_at: Date = new Date();

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
