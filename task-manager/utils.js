// Exporting all utility functions
module.exports = {
  menu,
  input,
  ReadAndconvertToJs,
  writeJsonTex,
  isValidPriority,
  isValidDate,
  isDuplicate,
  generateId
};

// File system module for reading/writing files
const fs = require('fs');

// =========================
// SHOW MENU
// =========================
function menu() {
  console.log(`========= TASK MANAGER =========

1. Add Task
2. View Tasks
3. Search Task
4. Update Task Status
5. Delete Task
6. Exit

================================`);
}


// =========================
// INPUT FUNCTION (CLI PROMPT)
// =========================
const readline = require("node:readline");

function input(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message}`, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}


// =========================
// READ JSON FILE → JS OBJECT
// =========================
function ReadAndconvertToJs(filePath) {
  try {
    // If file does not exist, return empty array
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const data = fs.readFileSync(filePath, 'utf-8');

    // If file is empty, return empty array
    if (data.trim() === "") {
      return [];
    }

    // Convert JSON string to JavaScript array
    return JSON.parse(data);

  } catch (err) {
    console.log("File error:", err.message);
    return [];
  }
}


// =========================
// WRITE DATA TO JSON FILE
// =========================
function writeJsonTex(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


// =========================
// PRIORITY VALIDATION
// =========================
function isValidPriority(priority) {
  const valid = ["low", "medium", "high"];
  return valid.includes(priority.toLowerCase());
}


// =========================
// DATE VALIDATION (YYYY-MM-DD)
// =========================
function isValidDate(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(date)) return false;

  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
}


// =========================
// DUPLICATE TASK CHECK
// Same title + same due date
// =========================
function isDuplicate(tasks, title, dueDate) {
  return tasks.some(
    task =>
      task.title.toLowerCase() === title.toLowerCase() &&
      task.dueDate === dueDate
  );
}


// =========================
// AUTO ID GENERATOR
// =========================
function generateId(tasks) {
  if (!tasks.length) return 100;

  const ids = tasks.map(t => Number(t.id));

  return Math.max(...ids) + 1;
}