const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function sortTasks() {
    
}

addTaskButton.addEventListener("click", function() {
    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        const priority = prioritySelect.value;
        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;
        if (priority === "3") li.classList.add("high");
        else if (priority === "2") li.classList.add("medium");
        else if (priority === "1") li.classList.add("low");
        li.appendChild(taskText);
        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        li.appendChild(checkButton)
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        const priority = prioritySelect.value;
        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;
        if (priority === "3") li.classList.add("high");
        else if (priority === "2") li.classList.add("medium");
        else if (priority === "1") li.classList.add("low");
        li.appendChild(taskText);
        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        li.appendChild(checkButton);
        taskList.appendChild(li);
        taskInput.value = "";
    }
});