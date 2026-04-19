
// Exporting addtasks function so it can be used in other files
module.exports = {
    addtasks
};

// Importing helper functions for reading and writing JSON files
const { ReadAndconvertToJs, writeJsonTex } = require("./utils");

// Function to add a new task into the file
function addtasks(
    filePath,
    id,
    title,
    description,
    priority,
    dueDate
) {
    // Read existing tasks from JSON file and convert to JavaScript array
    const data = ReadAndconvertToJs(filePath);

    // Creating a new task object
    const task = {
        id,
        title,
        description,
        priority,
        dueDate,
        status: "Pending" // default status when a task is created
    };

    // Adding new task to existing task list
    data.push(task);

    // Writing updated task list back to JSON file
    writeJsonTex(filePath, data);

    // Success message output
    console.log("============<<<Task ADD>>>=============");
    console.log("--- Task added successfully! ID -->", id);
    console.log("============<<<Task ADD>>>=============");
}