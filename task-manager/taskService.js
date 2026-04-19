// Exporting all task-related functions
module.exports = {
  addTask,
  showTasks,
  searchTask,
  updateTaskStatus,
  deleteTask
};

// Importing utility functions for file handling and validation
const {
  input,
  writeJsonTex,
  ReadAndconvertToJs,
  generateId,
  isValidPriority,
  isValidDate,
  isDuplicate
} = require("./utils");

const { addtasks } = require("./filehandelr");


// =========================
// ADD TASK FUNCTION
// =========================
async function addTask(filePath) {
  // Load existing tasks from file
  const tasks = ReadAndconvertToJs(filePath);

  // Take user input
  const title = await input("Enter Title: ");
  const description = await input("Enter Description: ");
  const priority = await input("Enter Priority (Low/Medium/High): ");
  const dueDate = await input("Enter Due Date (YYYY-MM-DD): ");

  // Input validation
  if (!title.trim()) return console.log("Title cannot be empty");
  if (!isValidPriority(priority)) return console.log("Invalid priority");
  if (!isValidDate(dueDate)) return console.log("Invalid date");

  // Check duplicate task
  if (isDuplicate(tasks, title, dueDate)) {
    console.log("============================");
    console.log("Duplicate task found!");
    console.log("============================");
    return;
  }

  // Generate unique ID automatically
  const id = generateId(tasks);

  // Save task using file handler
  addtasks(
    filePath,
    id,
    title,
    description,
    priority,
    dueDate
  );
}


// =========================
// GROUP TASKS BY PRIORITY
// =========================
function groupTasks(tasks) {
  return {
    High: tasks.filter(t => t.priority === "High"),
    Medium: tasks.filter(t => t.priority === "Medium"),
    Low: tasks.filter(t => t.priority === "Low")
  };
}


// =========================
// SHOW ALL TASKS
// =========================
async function showTasks(filePath) {
  const tasks = ReadAndconvertToJs(filePath);

  if (!tasks || tasks.length === 0) {
    console.log("No tasks found!");
    return;
  }

  const grouped = groupTasks(tasks);
  let count = 1;

  // Display tasks based on priority order
  for (let priority of ["High", "Medium", "Low"]) {
    if (grouped[priority].length > 0) {
      console.log(`\n=== ${priority.toUpperCase()} PRIORITY ===`);

      const tableData = grouped[priority].map(task => ({
        No: count++,
        ID: task.id,
        Task: task.title,
        Description: task.description,
        Due: task.dueDate,
        Status: task.status
      }));

      console.table(tableData);
    }
  }
}


// =========================
// SEARCH TASKS
// =========================
function searchTask(filePath, query) {
  const tasks = ReadAndconvertToJs(filePath);

  if (!tasks.length) {
    console.log("No tasks found!");
    return;
  }

  const q = query.toLowerCase();

  // Search by title, status, or priority
  const results = tasks.filter(task =>
    task.title.toLowerCase().includes(q) ||
    task.status.toLowerCase() === q ||
    task.priority.toLowerCase() === q
  );

  if (!results.length) {
    console.log("=========================");
    console.log("No matching tasks found!");
    console.log("=========================");
    return;
  }

  console.log("\n=== SEARCH RESULTS ===");

  const tableData = results.map((task, index) => ({
    No: index + 1,
    ID: task.id,
    Task: task.title,
    Description: task.description,
    Priority: task.priority,
    Status: task.status,
    Due: task.dueDate
  }));

  console.table(tableData);
}


// =========================
// UPDATE TASK STATUS
// =========================
function updateTaskStatus(filePath, id, newStatus) {
  const tasks = ReadAndconvertToJs(filePath);

  const validStatus = ["pending", "in progress", "completed"];

  // Validate status input
  if (!validStatus.includes(newStatus.toLowerCase())) {
    console.log("=====================");
    console.log("Invalid status!");
    console.log("=====================");
    return;
  }

  // Find task by ID
  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("=====================");
    console.log("Task not found!");
    console.log("=====================");
    return;
  }

  // Format status properly (capitalize first letter)
  task.status =
    newStatus.charAt(0).toUpperCase() +
    newStatus.slice(1).toLowerCase();

  // Save updated tasks
  writeJsonTex(filePath, tasks);

  console.log("============<<<Task Updated>>>=============");
  console.log("Task status updated successfully!");
  console.log("============<<<Task Updated>>>=============");
}


// =========================
// DELETE TASK
// =========================
function deleteTask(filePath, id) {
  const tasks = ReadAndconvertToJs(filePath);

  // Find task index
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    console.log("=====================");
    console.log("Task not found!");
    console.log("=====================");
    return;
  }

  // Remove task from array
  tasks.splice(index, 1);

  // Save updated tasks
  writeJsonTex(filePath, tasks);

  console.log("============<<<Task Deleted>>>=============");
  console.log("Task deleted successfully!");
  console.log("============<<<Task Deleted>>>=============");
}