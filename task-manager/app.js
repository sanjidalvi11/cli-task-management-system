
// Importing all required functions from taskService
const { addTask, showTasks, searchTask, updateTaskStatus, deleteTask } = require("./taskService");

// Importing input and menu utilities
const { input, menu } = require('./utils');

// File handler import (currently not used in this file)
const { addtasks } = require("./filehandelr");

// File path for storing tasks
const filePath = 'tasks.json';

// Main function to start the application
async function start() {
    menu(); // Display menu

    const inpt = await input("Enter a choice: "); // Take user input

    switch (inpt) {

        case '1':
            // Add a new task
            await addTask(filePath);
            start(); // Restart menu
            break;

        case '2':
            // Show all tasks
            await showTasks(filePath);
            return start();
            break;

        case '3':
            // Search tasks
            const query = await input("Search (title/status/priority): ");
            searchTask(filePath, query);
            start();
            break;

        case '4':
            // Update task status
            const id = await input("Enter Task ID: ");
            const status = await input("Enter Status (Pending / In Progress / Completed): ");

            updateTaskStatus(filePath, id, status);
            return start();
            break;

        case "5":
            // Delete a task
            const ID = await input("Enter Task ID: ");
            const confirm = await input("Are you sure? (y/n): ");

            if (confirm.toLowerCase() === "y") {
                deleteTask(filePath, ID);
            } else {
                console.log("Deletion cancelled.");
            }

            return start();

        case '6':
            // Exit application
            console.log("--- Thank You Goodbye ---");
            process.exit();
            return;

        default:
            // Handle invalid input
            console.log("Invalid");
            start();
    }
}

// Start the program
start();