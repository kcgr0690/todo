const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function sortTasks() {
    const priorityMap = {
        high: 3,
        medium:2,
        low:1
    };

    const tasks = Array.from(taskList.children);
    tasks.sort((a,b) => {
        const priorityA = priorityMap[a.classList[0]] || 1;
        const priorityB = priorityMap[b.classList[0]] || 1;
        return priorityB - priorityA;

    });

    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
    
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
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✕";
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        sortTasks();
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
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✕";
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        sortTasks();
        taskInput.value = "";
    }
});

taskList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const li = event.target.parentElement;
        li.classList.toggle("completed");

    }

});

taskList.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON" && event.target.textContent === "✕") {
        const li = event.target.parentElement;
        li.remove();
    }

});