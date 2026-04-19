module.exports={
  menu,
  input,
  ReadAndconvertToJs,
  writeJsonTex,
  isValidPriority,
  isValidDate,
  isDuplicate,
  generateId
}
const fs = require('fs');

function menu(){
   console.log(`========= TASK MANAGER =========

1. Add Task

2. View Tasks

3. Search Task

4. Update Task Status

5. Delete Task

6. Exit

================================`)
};

//input funtion
const readline = require("node:readline");
function  input(message) {
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



//Read and conver to json file

function ReadAndconvertToJs(filePath) {
  const fs = require('fs');

  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const data = fs.readFileSync(filePath, 'utf-8');

    if (data.trim() === "") {
      return [];
    }

    return JSON.parse(data);

  } catch (err) {
    console.log("File error:", err.message);
    return [];
  }
}
  
//write json
function writeJsonTex(filePath,data){
       fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

//  Priority Validation

function isValidPriority(priority) {
  const valid = ["low", "medium", "high"];

  return valid.includes(priority.toLowerCase());
}

//  Date Validation
//    Format: YYYY-MM-DD

function isValidDate(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(date)) return false;

  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
}

  //   Duplicate Check
  //  Same Title + Same Due Date

function isDuplicate(tasks, title, dueDate) {
  return tasks.some(
    task =>
      task.title.toLowerCase() === title.toLowerCase() &&
      task.dueDate === dueDate
  );
}

function generateId(tasks) {
  if (!tasks.length) return 100;

  const ids = tasks.map(t => Number(t.id));
  
  return Math.max(...ids) + 1;
}