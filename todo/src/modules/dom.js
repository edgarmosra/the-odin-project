import { Tasklist } from "./taskList";

export class DomController {
  constructor() {
    // dom variables
    this.taskListEl = document.querySelector(".task-list");
    this.form = document.getElementById("task-form");
    this.submitTask = document.querySelector(".add-task-btn");
    this.completedBtn = document.querySelector(".completed-btn");
    this.showAllTasksBtn = document.querySelector(".show-all-btn");
    this.showCompletedTasksBtn = document.querySelector(".completed-btn");
    this.filterBtns = document.querySelectorAll(".filter-btn");
    this.taskList = new Tasklist();

    this.activeBtn = this.showAllTasksBtn;

    // dom event listeners
    this.submitTask.addEventListener("click", this.submitTaskForm);
    this.showCompletedTasksBtn.addEventListener("click", this.renderTasks);
    this.showAllTasksBtn.addEventListener("click", this.renderTasks);
    this.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.changeActiveBtn(e.target.textContent);
      });
    });

    // default all btn to be clicked
    this.activeBtn.classList.add("active-btn");
  }

  submitTaskForm = (e) => {
    e.preventDefault();

    const name = document.getElementById("task-name").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.querySelector(
      'input[name="priority"]:checked'
    )?.value;

    // if (name === "" || dueDate === "") return;

    this.taskList.addTask(name, dueDate, priority);
    this.form.reset();
    this.renderTasks(e);
  };

  createTaskEl = (task) => {
    const mainTaskEl = document.createElement("li");
    const taskCheckboxEl = document.createElement("input");
    const taskLabelEl = document.createElement("label");
    const taskPriorityLevelEl = document.createElement("div");
    const taskDueDateEl = document.createElement("div");
    const taskDeleteBtn = document.createElement("div");

    mainTaskEl.classList.add("task");
    taskPriorityLevelEl.classList.add("priority-level");
    taskPriorityLevelEl.style.backgroundColor = task.priority;
    taskDeleteBtn.classList.add("delete-task");
    taskDueDateEl.classList.add("task-dd");

    taskCheckboxEl.type = "checkbox";
    taskCheckboxEl.id = task.uid;
    taskCheckboxEl.name = task.uid;
    taskCheckboxEl.checked = task.completed;
    if (task.completed) taskLabelEl.classList.toggle("completed-task");

    taskLabelEl.htmlfor = task.id;
    taskLabelEl.textContent = task.name;
    taskDeleteBtn.textContent = "X";
    taskDueDateEl.textContent = "due: " + task.dueDate;

    this.taskListEl.append(mainTaskEl);
    mainTaskEl.append(taskCheckboxEl);
    mainTaskEl.append(taskLabelEl);
    mainTaskEl.append(taskPriorityLevelEl);
    mainTaskEl.append(taskDueDateEl);
    mainTaskEl.append(taskDeleteBtn);

    taskCheckboxEl.addEventListener("click", (e) => {
      task.toggleCompleted();
      taskLabelEl.classList.toggle("completed-task");
    });

    taskDeleteBtn.addEventListener("click", (e) => {
      this.taskList.tasks = this.taskList.deleteTask(task.id);
      this.renderTasks(e);
    });
  };

  renderTasks = (e) => {
    const btnText = e.target.textContent.trim();
    this.taskListEl.replaceChildren();

    if (btnText === "Add Task" || btnText === "All" || btnText === "X") {
      this.changeActiveBtn("All");
      this.taskList.getAllTasks().forEach((task) => {
        this.createTaskEl(task);
      });
    } else if (btnText === "Completed") {
      this.taskList.getCompletedTasks().forEach((task) => {
        this.createTaskEl(task);
      });
    }
  };

  changeActiveBtn = (clickedBtn) => {
    this.activeBtn.classList.remove("active-btn");
    if (clickedBtn === "Completed") this.activeBtn = this.completedBtn;
    if (clickedBtn === "All") this.activeBtn = this.showAllTasksBtn;

    this.activeBtn.classList.add("active-btn");
  };
}
