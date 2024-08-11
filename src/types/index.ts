export interface Task {
  title: string;
  completed: boolean;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}
