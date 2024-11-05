// has crud capabilities
import { Task } from "./task";

export class Tasklist {
  constructor() {
    this.tasks = [
      // {
      //   name: "Finish School Project",
      //   dueDate: "2024-10-31",
      //   project: "default",
      //   completed: false,
      //   priority: "red",
      //   id: "5787b371-74a9-4a8d-8761-22b0854e6450",
      // },
    ];
  }

  addTask = (name, dueDate, priority) => {
    const task = new Task(name, dueDate, priority);
    this.tasks.push(task);
  };

  getCompletedTasks = () => {
    const completedTasksArr = this.tasks.filter(
      (task) => task.completed === true
    );
    return completedTasksArr;
  };

  deleteTask = (id) => {
    const remainingTasksArr = this.tasks.filter((task) => task.id !== id);
    return remainingTasksArr;
  };

  getAllTasks = () => {
    return this.tasks;
  };
}
