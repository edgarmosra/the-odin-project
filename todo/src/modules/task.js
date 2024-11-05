import { v4 as uuidv4 } from "uuid";

export class Task {
  constructor(name, dueDate, priority) {
    this.name = name;
    this.dueDate = dueDate;
    this.project = "default";
    this.completed = false;
    this.priority = priority;
    this.id = uuidv4();
  }

  toggleCompleted = () => {
    this.completed = !this.completed;
  };

  getId = () => {
    return this.id;
  };
}
