const taskInput = document.getElementById("task-input");
const taskBtn = document.getElementsByClassName("add-task");
const taskContainer = document.querySelector("#task-container");
const taskStatus = document.querySelector("#task-status");
const taskStatusContainer = document.querySelector(".task-status-container");
const taskCount = document.querySelector("#task-count");

let count = 0;

let taskList = [];

function addingNewTask() {
    if(taskInput.value.trim().length > 3 ){
    const task = taskInput.value.trim();
    taskList = { text: task , completed: false }
    taskInput.value = '';
    
    randerTask();

    }

    else{
        alert('invalid input \ntask must be more than 3 characters');
        taskInput.value = '';
        
    }
}

function randerTask() {
    let p = document.createElement("p");
    let div = document.createElement("div");
    p.textContent = taskList["text"];
    taskContainer.append(div);
    div.append(p);
    div.classList.add("p-container");
    p.addEventListener('click' , () => {
        p.classList.add("completed")
    });
}
