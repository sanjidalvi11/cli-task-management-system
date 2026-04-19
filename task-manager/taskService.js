module.exports={
    addTask,
    showTasks,
    searchTask,
    updateTaskStatus,
    deleteTask
}
const {
     input,
     writeJsonTex,
     ReadAndconvertToJs,
     generateId, 
     isValidPriority,
     isValidDate, 
     isDuplicate
    }=require("./utils")
const {addtasks}=require("./filehandelr");


//add tasks

async function addTask(filePath){
     const tasks = ReadAndconvertToJs(filePath); // 👈 আগের data load

      const title = await input("Enter Title: ");
      const description = await input("Enter Description: ");
      const priority = await input("Enter Priority (Low/Medium/High): ");
      const dueDate = await input("Enter Due Date (YYYY-MM-DD): ");
      // validation
     if (!title.trim()) return console.log("Title cannot be empty");
     if (!isValidPriority(priority)) return console.log("Invalid priority");
     if (!isValidDate(dueDate)) return console.log("Invalid date");
     // duplicate check
    if (isDuplicate(tasks, title, dueDate)) {
        console.log("============================")
       return console.log("Duplicate task found!");
       console.log("==============================")
    }

    // 🔥 AUTO ID GENERATE HERE
  const id = generateId(tasks);
  
               addtasks( 
                       filePath,  
                        id,
                        title,
                        description,
                        priority,
                        dueDate
                        );

 }


// show tasks//

function groupTasks(tasks) {
  return {
    High: tasks.filter(t => t.priority === "High"),
    Medium: tasks.filter(t => t.priority === "Medium"),
    Low: tasks.filter(t => t.priority === "Low")
  };
}

async function showTasks(filePath) {
  const tasks = ReadAndconvertToJs(filePath);

  if (!tasks || tasks.length === 0) {
    console.log("No tasks found!");
    return;
  }

  const grouped = groupTasks(tasks);

  let count = 1;

  for (let priority of ["High", "Medium", "Low"]) {
    if (grouped[priority].length > 0) {
      console.log(`\n=== ${priority.toUpperCase()} PRIORITY ===`);

      const tableData = grouped[priority].map(task => ({
        No: count++,
        ID: task.id,
        Task: task.title,
        description: task.description,
        Due: task.dueDate,
        status:task.status
      }));

      console.table(tableData);
    } 
  }
}
//  Search Task
function searchTask(filePath, query) {
  const tasks = ReadAndconvertToJs(filePath);

  if (!tasks.length) {
    console.log("No tasks found!");
    return;
  }

  const q = query.toLowerCase();

  const results = tasks.filter(task =>
    task.title.toLowerCase().includes(q) ||
    task.status.toLowerCase() === q ||
    task.priority.toLowerCase() === q
  );

  if (!results.length) {
    console.log("=========================")
    console.log("No matching tasks found!");
    console.log("===========================")
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



//  Update Task Status
function updateTaskStatus(filePath, id, newStatus) {
  const tasks = ReadAndconvertToJs(filePath);

  const validStatus = ["pending", "in progress", "completed"];

  if (!validStatus.includes(newStatus.toLowerCase())) {
    console.log("=====================")
    console.log("Invalid status!");
    console.log("=====================")
    return;
  }

  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("=====================")
    console.log("Task not found!");
    console.log("=====================")
    return;
  }

  // format status (Nice output)
  task.status =
    newStatus.charAt(0).toUpperCase() +
    newStatus.slice(1).toLowerCase();

  writeJsonTex(filePath,tasks) // 🔥 save full array
 console.log("============<<<Task-updated>>>=============");
  console.log("Task status updated successfully!");
   console.log("============<<<Task-Updated>>>=============");
}

// delete Tasks

function deleteTask(filePath, id) {
  const tasks = ReadAndconvertToJs(filePath);

  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    console.log("=====================")
    console.log("Task not found!");
    console.log("=====================")
    return;
  }

  // remove task
  tasks.splice(index, 1);

  // save updated array
  writeJsonTex(filePath, tasks);
  console.log("============<<<Task-Delete>>>=============");
  console.log("Task deleted successfully!");
  console.log("============<<<Task-Delete>>>=============");
}
