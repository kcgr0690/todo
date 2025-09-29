const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function() {
    if (taskInput.value.trim() !== ""); {
        const li = document.createElement("li");
        const priority = prioritySelect.value;
        if (priority === "3") li.classList.add("high");
        else if (priority === "2") li.classList.add("medium");
        else if (priority === "1") li.classList.add("low");
        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        li.appendChild(checkButton);
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && taskInput.value.trim() !== ""); {
        const li = document.createElement("li");
        const priority = prioritySelect.value;
        if (priority === "3") li.classList.add("high");
        else if (priority === "2") li.classList.add("medium");
        else if (priority === "1") li.classList.add("low");
        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        li.appendChild(checkButton);
        taskList.appendChild(li);
        taskInput.value = "";
    }
});