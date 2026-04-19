Module 15 Assignment
OVERVIEW
In this assignment, you are required to build a Command-Line Interface (CLI) Task Management

System using JavaScript (Node.js).

The program must run in the terminal using Node.js only.

You are NOT allowed to use:

● Express.js or any framework

● External npm packages (like lodash, moment, etc.)

● Database systems (MongoDB, MySQL, etc.)

You ARE allowed to use:

● Built-in Node.js modules (fs, path, readline)

This assignment tests your understanding of:

● JavaScript fundamentals (functions, arrays, objects)

● File handling in Node.js

● Control flow and loops

● Modular code structure

● Input validation and error handling

MAIN REQUIREMENTS
1. Add Task

Allow users to add a task with:

● Task Title

● Task Description

● Priority (Low / Medium / High)

● Due Date

Each task must have a unique auto-generated ID

2. Prevent Duplicate Tasks

A task is considered duplicate if:

● Same Title AND Same Due Date already exists

If duplicate found:

Show meaningful error message and do not add

3. View All Tasks

Display all tasks in a clean CLI table format:

● Proper numbering

● Formatted output

● Group tasks by Priority (High → Medium → Low)

4. Save Tasks to File

● Store tasks in a .json file

● Automatically save after every add/delete/update

5. Load Tasks on Startup

● When program starts, load existing tasks from file

● If file does not exist → start with empty list (no crash)

6. Delete Task

● Delete task using ID

● Ask confirmation before deletion

7. Update Task Status

Each task should have status:

● Pending

● In Progress

● Completed

Allow user to update status using task ID

8. Search Task (Tricky Filtering)

Search by:

● Title (partial match)

● Status

● Priority

Must support case-insensitive search

Input Validation Rules
● Title cannot be empty

● Priority must be valid (Low/Medium/High only)

● Due date must be in valid format (YYYY-MM-DD)

● ID must be numeric internally

Show clear error messages if invalid input is provided.

FILE STRUCTURE (MANDATORY)

You must split into modules:

/task-manager

├── app.js

├── taskService.js

├── fileHandler.js

├── utils.js

└── tasks.json

MENU SYSTEM (CLI)

========= TASK MANAGER =========

1. Add Task

2. View Tasks

3. Search Task

4. Update Task Status

5. Delete Task

6. Exit

================================

Enter your choice:

SAMPLE FLOW

Add Task

Enter Title: Fix Login Bug

Enter Description: Login fails on Chrome

Enter Priority: High

Enter Due Date: 2026-04-15

Task added successfully!

Duplicate Task

Error: Task with same title and due date already exists.

View Tasks

HIGH PRIORITY

1. [101] Fix Login Bug | Pending | Due: 2026-04-15

MEDIUM PRIORITY

2. [102] Update UI | In Progress | Due: 2026-04-20

Delete Task

Enter Task ID: 101

Are you sure? (y/n): y

Task deleted successfully.


