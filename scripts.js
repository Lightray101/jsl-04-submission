const userTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Conquer React⚛️",
    description: "Learn the basics of React.",
    status: "todo",
  },
  {
    id: 3,
    title: "Understand Databases⚙️",
    description: "Study database concepts.",
    status: "todo",
  },
  {
    id: 4,
    title: "Crush Frameworks🖼️",
    description: "Explore various frameworks.",
    status: "todo",
  },
  {
    id: 5,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals.",
    status: "doing",
  },
  {
    id: 6,
    title: "Never Give Up 🏆",
    description: "Keep pushing forward!",
    status: "doing",
  },
  {
    id: 7,
    title: "Explore ES6 Features 🚀",
    description: "Deep dive into ES6.",
    status: "done",
  },
  {
    id: 8,
    title: "Have fun 🥳",
    description: "Enjoy the process!",
    status: "done",
  },
];
const maxTasksFirst = 3;
const maxTasksTotal = 6;

// First round: up to 3 tasks via prompts
let tasksAddedByPrompt = 0;
while (tasksAddedByPrompt < maxTasksFirst) {
  const add = confirm("Would you like to add a new task?");
  if (!add) break;

  const title = prompt("Enter task title:");
  const description = prompt("Enter task description:");
  let status = prompt("Enter task status (todo, doing, done):").toLowerCase();

  while (status !== "todo" && status !== "doing" && status !== "done") {
    alert("Invalid status. Please enter 'todo', 'doing', or 'done'.");
    status = prompt("Enter task status (todo, doing, done):").toLowerCase();
  }

  // Calculate the next available ID
  const nextId =
    userTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;

  userTasks.push({
    id: nextId,
    title,
    description,
    status,
  });
  tasksAddedByPrompt++;
}

// After adding initial tasks and potentially the first 3 via prompt,
// check if we should offer to add 3 more.
// This condition needs to be adjusted based on total tasks AFTER the first prompt phase
const totalTasksAfterFirstPrompt = userTasks.length; // userTasks now includes initial + first prompt batch

if (tasksAddedByPrompt === maxTasksFirst) {
  // Only ask for more if the first 3 were offered/added
  const addMore = confirm("Would you like to add 3 more tasks?");
  if (addMore) {
    let tasksAddedInSecondRound = 0;
    while (
      tasksAddedInSecondRound < maxTasksFirst &&
      userTasks.length < maxTasksTotal
    ) {
      // Limit to 3 more AND total max
      const add = confirm("Would you like to add another task?");
      if (!add) break;

      const title = prompt("Enter task title:");
      const description = prompt("Enter task description:");
      let status = prompt(
        "Enter task status (todo, doing, done):"
      ).toLowerCase();

      while (status !== "todo" && status !== "doing" && status !== "done") {
        alert("Invalid status. Please enter 'todo', 'doing', or 'done'.");
        status = prompt("Enter task status (todo, doing, done):").toLowerCase();
      }

      // Calculate the next available ID
      const nextId =
        userTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;

      userTasks.push({
        id: nextId,
        title,
        description,
        status,
      });
      tasksAddedInSecondRound++;
    }
  }
}

if (userTasks.length >= maxTasksTotal) {
  // Changed condition to >= maxTasksTotal
  alert(
    "There are enough tasks on your board, please check them in the console."
  );
}

// Function to filter completed tasks
function getCompletedTasks(arr) {
  return arr.filter((task) => task.status === "done");
}

// Log all user-created tasks as an array
console.log("All tasks:", userTasks);

// Log only completed tasks as an array
console.log("Completed tasks:", getCompletedTasks(userTasks));
// DOM Elements
const taskColumns = {
  todo: document.querySelector('[data-status="todo"] .tasks-container'),
  doing: document.querySelector('[data-status="doing"] .tasks-container'),
  done: document.querySelector('[data-status="done"] .tasks-container'),
};
/**
 * Creates a task element with the given task data
 * @param {Object} task - The task object containing id, title, description, and status
 * @returns {HTMLElement} The created task element
 */
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.className = "task-div";
  taskElement.dataset.taskId = task.id;
  taskElement.textContent = task.title;

  // Add click event to open modal
  taskElement.addEventListener("click", () => openTaskModal(task));

  return taskElement;
}
/**
 * Opens the task modal with the given task data
 * @param {Object} task - The task object to display in the modal
 */
function openTaskModal(task) {
  // Create modal elements
  const modal = document.createElement("div");
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Create a header div for the title and close button
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  // Create the modal title
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Edit Task";

  // Add a close button (X icon)
  const closeButton = document.createElement("button");
  closeButton.className = "close-modal-button";
  closeButton.innerHTML = "&times;"; // HTML entity for 'times' (X)

  // Append title and close button to the header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Append the header to modal content
  modalContent.appendChild(modalHeader);