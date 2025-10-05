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

        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✕";
        const editButton = document.createElement("button");
        editButton.textContent = "✎";
        li.appendChild(deleteButton);
        li.appendChild(taskText);
        li.appendChild(editButton)
        li.appendChild(checkButton);
        taskList.appendChild(li);
        sortTasks();
        taskInput.value = "";
        const dueDateValue = dueDateInput.value;
        if (dueDateValue) {
        const dueSpan = document.createElement("span");
        dueSpan.className = "due-date";
        dueSpan.textContent = new Date(dueDateValue).toLocaleDateString();
        li.appendChild(dueSpan);
    }
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
        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✕";
        const editButton = document.createElement("button")
        editButton.textContent = "✎";
        li.appendChild(deleteButton);
        li.appendChild(taskText);
        taskList.appendChild(li);
        li.appendChild(editButton)
        li.appendChild(checkButton);
        sortTasks();
        taskInput.value = "";
        const dueDateValue = dueDateInput.value;
        if (dueDateValue) {
            const dueSpan = document.createElement("span");
            dueSpan.className = "due-date";
            dueSpan.textContent = new Date(dueDateValue).toLocaleDateString();
            li.appendChild(dueSpan);
        }
    }
});

taskList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON" && event.target.textContent === "✔") {
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

taskList.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON" || event.target.textContent !== "✎") return;

  const li = event.target.parentElement;
  const span = li.querySelector("span");
  if (!span) return;

  const oldText = span.textContent;
  const oldDue = li.querySelector(".due-date") ? li.querySelector(".due-date").textContent : "";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = oldText;
  textInput.className = "inline-edit";
  li.replaceChild(textInput, span);

  if (oldDue) {
    const oldDueSpan = li.querySelector(",due-date");
    const dueInput = document.createElement("input")
    dueInput.type = "date";
    dueInput.value = oldDueSpan.textContent;
    li.replaceChild(dueInput, oldDueSpan);
  }

  textInput.focus();
  input.select();

  /*let finished = false;
  const finish = (newText) => {
    if (finished) return;
    finished = true;
    const newSpan = document.createElement("span");
    newSpan.textContent = newText;
    li.replaceChild(newSpan, input);
  };


  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      finish(input.value.trim() || oldText);
    } else if (e.key === "Escape") {
      e.preventDefault();

      finish(oldText);
    }
  });


  input.addEventListener("blur", function () {
    finish(input.value.trim() || oldText);
  });
  */
});