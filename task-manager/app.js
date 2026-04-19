
const {addTask,showTasks,searchTask,updateTaskStatus,deleteTask}=require("./taskService");
const {input,menu} = require('./utils');
const {addtasks}=require("./filehandelr");
const filePath='tasks.json';
  async function start(){
    menu();
     const inpt= await input("Enter a choice: ");
        switch(inpt){
            case'1':
           
                await addTask(filePath)
                start()


                  
            break;
            case '2':
                await showTasks(filePath);
                return start()
                break;
            case'3':
            const query = await input("Search (title/status/priority): ");
                 searchTask(filePath, query);
                start()
                 break;

            case '4':
                 const id = await input("Enter Task ID: ");
                 const status = await input(
                               "Enter Status (Pending / In Progress / Completed): "
                                 );

                  updateTaskStatus(filePath, id, status);
                  return start();
                  break;
            case "5":
                  const ID = await input("Enter Task ID: ");

                  const confirm = await input("Are you sure? (y/n): ");

                  if (confirm.toLowerCase() === "y") {
                     deleteTask(filePath, ID);
                     } else {
                     console.log("Deletion cancelled.");
                       }

                     return start();
            case '6':
                console.log("--- Thaks You Good BY ---")
                process.exit();
                return;
            default:
             console.log("Invalid");
             start();
        };
        
    
};

start();