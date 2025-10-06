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

taskInput.addEventListener("keydown", function(event) {
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
  if (!(event.target.tagName === "BUTTON" && event.target.textContent === "✎")) return;

  const li = event.target.parentElement;
  const span = li.querySelector("span");
  if (!span) return;

  const oldText = span.textContent;
  const oldDueSpan = li.querySelector(".due-date");
  const oldDue = oldDueSpan ? oldDueSpan.textContent : "";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = oldText;
  textInput.className = "inline-edit";
  li.replaceChild(textInput, span);

  let dueInput = null;
  if (oldDueSpan) {
    dueInput = document.createElement("input");
    dueInput.type = "date";
    const parts = oldDueSpan.textContent.split('/');
    dueInput.value = `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2,'0')}`;
    li.replaceChild(dueInput, oldDueSpan);
  }

  textInput.focus();
  textInput.select();

  const saveEdit = (newText, newDue) => {
    const existingTextInput = li.querySelector("input[type='text']");
    const existingDueInput = li.querySelector("input[type='date']");
    const existingDueSpan = li.querySelector(".due-date");
    
    
    const newSpan = document.createElement("span");
    newSpan.textContent = newText;
    if (existingTextInput) {
      li.replaceChild(newSpan, existingTextInput);
    }
    
    
    
    if (newDue) {
      if (existingDueInput) {
      existingDueInput.remove();
    }
      const newDueSpan = document.createElement("span");
      newDueSpan.className = "due-date";
      newDueSpan.textContent = new Date(newDue).toLocaleDateString();
      newSpan.insertAdjacentElement("afterend", newDueSpan);
    }
  };

  textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newDueValue = dueInput ? dueInput.value : "";
      saveEdit(textInput.value.trim() || oldText, newDueValue);
    } else if (e.key === "Escape") {
      const originalDueValue = oldDue ? (() => {
        const parts = oldDue.split('/');
        return `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2,'0')}`;
      })() : "";
      saveEdit(oldText, originalDueValue);
    }
  });

  textInput.addEventListener("blur", () => {
    setTimeout(() => {
      if (dueInput && document.activeElement === dueInput) return;
      const newDueValue = dueInput ? dueInput.value : "";
      saveEdit(textInput.value.trim() || oldText, newDueValue);
    }, 120);
  });

  if (dueInput) {
    dueInput.addEventListener("blur", () => {
      setTimeout(() => {
        if (document.activeElement === textInput) return;
        const newDueValue = dueInput.value;
        saveEdit(textInput.value.trim() || oldText, newDueValue);
      }, 120);
    });
  }
});