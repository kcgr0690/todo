const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const dueDateInput = document.getElementById("dueDateInput");


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
        taskText.className = "task-text";

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
        editButton.className = 'edit-button'
        li.appendChild(deleteButton);
        li.appendChild(taskText);
        const dueDateValue = dueDateInput.value;
        if (dueDateValue) {
          const dueSpan = document.createElement("span");
          dueSpan.className = "due-date";
          dueSpan.textContent = ymdToLocalDisplay(dueDateValue);
          dueSpan.dataset.ymd = dueDateValue;
          li.appendChild(dueSpan);
          function ymdToLocalDisplay(ymd) {
          if (!ymd) return "";
            const [y, m, d] = ymd.split("-").map(Number);
            const dateObj = new Date(y, m - 1, d);
            return dateObj.toLocaleDateString();
        }
        
    }
        li.appendChild(editButton)
        li.appendChild(checkButton);
        taskList.appendChild(li);
        sortTasks();
        taskInput.value = "";
        
        
    }
});

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {

        const li = document.createElement("li");
        const priority = prioritySelect.value;
        const taskText = document.createElement("span");
        taskText.className = "task-text";

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
        editButton.className = 'edit-button'
        li.appendChild(deleteButton);
        li.appendChild(taskText);
        taskList.appendChild(li);
        const dueDateValue = dueDateInput.value;
        if (dueDateValue) {
            const dueSpan = document.createElement("span");
            dueSpan.className = "due-date";
            dueSpan.textContent = ymdToLocalDisplay(dueDateValue);
            dueSpan.dataset.ymd = dueDateValue;
            li.appendChild(dueSpan);
            function ymdToLocalDisplay(ymd) {
          if (!ymd) return "";
            const [y, m, d] = ymd.split("-").map(Number);
            const dateObj = new Date(y, m - 1, d);
            return dateObj.toLocaleDateString();
          }
        }
        li.appendChild(editButton)
        li.appendChild(checkButton);
        sortTasks();
        taskInput.value = "";

        
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
  const editButton = event.target;
  const textSpan = li.querySelector(".task-text") || li.querySelector("span:not(.due-date)");
  if (!textSpan) return;

  const oldText = textSpan.textContent;
  const oldDueSpan = li.querySelector(".due-date");
  const parseDisplayToYmd = (s) => {
    if (!s) return "";
    const parts = s.split('/');
    if (parts.length !== 3) return "";
    return `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2,'0')}`;
  };
  const oldYmd = oldDueSpan ? (oldDueSpan.dataset.ymd || parseDisplayToYmd(oldDueSpan.textContent)) : "";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.className = "inline-edit";
  textInput.value = oldText;
  li.replaceChild(textInput, textSpan);

  let dateInput = document.createElement("input");
dateInput.type = "date";
dateInput.value = oldYmd || "";

if (oldDueSpan) {
  li.replaceChild(dateInput, oldDueSpan);
} else {
  li.insertBefore(dateInput, editButton);
}
  textInput.focus();
  textInput.select();

  const formatFromYmd = (ymd) => {
    if (!ymd) return "";
    const [y,m,d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString();
  };

  const finish = (newText, newYmd) => {
  const newSpan = document.createElement("span");
  newSpan.className = "task-text";
  newSpan.textContent = newText;
  if (textInput.parentElement) li.replaceChild(newSpan, textInput);

  const dateInputElement = li.querySelector('input[type="date"]');
  const existingDue = li.querySelector(".due-date");

  const formatFromYmdLocal = (ymd) => {
    if (!ymd) return "";
    const [y,m,d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString();
  };
  const finalYmd = dateInputElement ? (dateInputElement.value || "") : (newYmd || "");

  if (finalYmd) {
    if (existingDue) {
      existingDue.dataset.ymd = finalYmd;
      existingDue.textContent = formatFromYmdLocal(finalYmd);
      if (dateInputElement) dateInputElement.remove();
    } else if (dateInputElement) {
      const newDueSpan = document.createElement("span");
      newDueSpan.className = "due-date";
      newDueSpan.dataset.ymd = finalYmd;
      newDueSpan.textContent = formatFromYmdLocal(finalYmd);
      li.replaceChild(newDueSpan, dateInputElement);
    } else {
      const newDueSpan = document.createElement("span");
      newDueSpan.className = "due-date";
      newDueSpan.dataset.ymd = finalYmd;
      newDueSpan.textContent = formatFromYmdLocal(finalYmd);
      li.insertBefore(newDueSpan, editButton);
    }
  } else {
    if (dateInputElement) dateInputElement.remove();
    if (existingDue) existingDue.remove();
    else if (oldYmd) {
      const restore = document.createElement("span");
      restore.className = "due-date";
      restore.dataset.ymd = oldYmd;
      restore.textContent = formatFromYmdLocal(oldYmd);
      li.insertBefore(restore, editButton);
    }
  }
};

  textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newYmd = dateInput ? dateInput.value : "";
      finish(textInput.value.trim() || oldText, newYmd);
    } else if (e.key === "Escape") {
      finish(oldText, oldYmd);
    }
  });

  textInput.addEventListener("blur", () => {
    setTimeout(() => {
      if (dateInput && document.activeElement === dateInput) return;
      const newYmd = dateInput ? dateInput.value : "";
      finish(textInput.value.trim() || oldText, newYmd);
    }, 120);
  });

  if (dateInput) {
    dateInput.addEventListener("blur", () => {
      setTimeout(() => {
        if (document.activeElement === textInput) return;
        finish(textInput.value.trim() || oldText, dateInput.value);
      }, 120);
    });
  }
});