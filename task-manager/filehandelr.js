
module.exports={
    addtasks
}
const {ReadAndconvertToJs,writeJsonTex}=require("./utils");
// const filePath='tasks.json';
// file create + write
function addtasks(
    filePath,
    id,
    title,
    description,
    priority,
    dueDate) {
    const data=ReadAndconvertToJs(filePath);
 const task= {
              id,
              title,
              description,
              priority,
              dueDate,
              status: "Pending"
            };

   data.push(task);
   writeJsonTex(filePath,data);
   console.log("============<<<Task-ADD>>>=============");
   console.log("---Task added successfully!--- ID-->",id);
   console.log("============<<<Task-ADD>>>===============");
  
}

